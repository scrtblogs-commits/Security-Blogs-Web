"""
Converts every .md file in Documentation/Markdown/ to a styled PDF in Documentation/PDFs/.
Run: python Documentation/convert_md_to_pdf.py
Requires: reportlab, markdown  (install: pip install --user reportlab markdown)
"""
import os
import re
import sys
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, black, white
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak,
    Table, TableStyle, Preformatted, HRFlowable, KeepTogether,
)
from reportlab.lib.enums import TA_LEFT

ROOT = Path(__file__).resolve().parent
MD_DIR = ROOT / 'Markdown'
PDF_DIR = ROOT / 'PDFs'
PDF_DIR.mkdir(parents=True, exist_ok=True)

styles = getSampleStyleSheet()

H1 = ParagraphStyle('H1', parent=styles['Title'], fontSize=22, leading=26,
                    spaceAfter=12, textColor=HexColor('#0b3a86'))
H2 = ParagraphStyle('H2', parent=styles['Heading1'], fontSize=16, leading=20,
                    spaceBefore=14, spaceAfter=8, textColor=HexColor('#0b3a86'))
H3 = ParagraphStyle('H3', parent=styles['Heading2'], fontSize=13, leading=17,
                    spaceBefore=10, spaceAfter=6, textColor=HexColor('#1e5fe0'))
H4 = ParagraphStyle('H4', parent=styles['Heading3'], fontSize=11, leading=14,
                    spaceBefore=8, spaceAfter=4, textColor=HexColor('#333'))
BODY = ParagraphStyle('Body', parent=styles['BodyText'], fontSize=9.5, leading=13,
                      spaceAfter=6, alignment=TA_LEFT)
BULLET = ParagraphStyle('Bullet', parent=BODY, leftIndent=14, bulletIndent=2)
CODE = ParagraphStyle('Code', parent=styles['Code'], fontSize=8.5, leading=11,
                      textColor=HexColor('#222'), backColor=HexColor('#f5f5f7'),
                      borderColor=HexColor('#ddd'), borderWidth=0.5,
                      borderPadding=6, spaceAfter=8)
QUOTE = ParagraphStyle('Quote', parent=BODY, leftIndent=14,
                       textColor=HexColor('#555'), fontName='Helvetica-Oblique')


def md_inline_to_rl(text: str) -> str:
    """Convert markdown inline syntax to ReportLab Paragraph XML."""
    # Escape & first
    text = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    # Extract inline code FIRST so its contents don't get parsed as bold/italic.
    # Replace with sentinel tokens; restore after other transforms.
    code_blocks: list = []

    def _stash_code(m):
        code_blocks.append(m.group(1))
        return f'\x00CODE{len(code_blocks) - 1}\x00'

    text = re.sub(r'`([^`]+)`', _stash_code, text)
    # Bold then italic (do bold first to avoid italic eating asterisks)
    text = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', text)
    text = re.sub(r'__([^_]+)__', r'<b>\1</b>', text)
    text = re.sub(r'(?<![\*_])\*([^*\n]+)\*(?![\*_])', r'<i>\1</i>', text)
    text = re.sub(r'(?<![\*_\w])_([^_\n]+)_(?![\*_\w])', r'<i>\1</i>', text)
    # Links [text](url) — render as text in blue
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)',
                  r'<link href="\2" color="#1e5fe0">\1</link>', text)

    # Restore code blocks (now safe — inner content never had _ or * processed)
    def _restore(m):
        idx = int(m.group(1))
        return f'<font face="Courier" color="#a30">{code_blocks[idx]}</font>'

    text = re.sub(r'\x00CODE(\d+)\x00', _restore, text)
    return text


def parse_table(lines: list, start: int):
    """Parse a markdown table starting at lines[start]. Returns (table_data, end_idx)."""
    rows = []
    i = start
    while i < len(lines) and '|' in lines[i] and lines[i].strip():
        line = lines[i].strip()
        if re.match(r'^\|?\s*[-:|\s]+\|?\s*$', line):
            i += 1
            continue
        cells = [c.strip() for c in line.strip('|').split('|')]
        rows.append(cells)
        i += 1
    return rows, i


def build_table_flowable(rows: list):
    if not rows:
        return None
    n_cols = max(len(r) for r in rows)
    # Pad rows
    rows = [r + [''] * (n_cols - len(r)) for r in rows]
    # Convert cells to Paragraphs so they wrap
    processed = []
    for ri, row in enumerate(rows):
        prow = []
        for cell in row:
            txt = md_inline_to_rl(cell)
            style = BODY if ri > 0 else ParagraphStyle('TH', parent=BODY,
                                                       fontName='Helvetica-Bold',
                                                       textColor=white,
                                                       fontSize=9.5)
            prow.append(Paragraph(txt, style))
        processed.append(prow)
    page_w = A4[0] - 30 * mm
    col_w = page_w / n_cols
    t = Table(processed, colWidths=[col_w] * n_cols, repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), HexColor('#0b3a86')),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('GRID', (0, 0), (-1, -1), 0.4, HexColor('#bbb')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, HexColor('#f7f9fc')]),
    ]))
    return t


def md_to_flowables(md_text: str):
    """Convert markdown text to a list of ReportLab flowables."""
    flowables = []
    lines = md_text.replace('\r\n', '\n').split('\n')
    i = 0
    in_code = False
    code_buf = []
    para_buf = []

    def flush_para():
        nonlocal para_buf
        if para_buf:
            text = md_inline_to_rl(' '.join(para_buf).strip())
            if text:
                flowables.append(Paragraph(text, BODY))
            para_buf = []

    def flush_code():
        nonlocal code_buf
        if code_buf:
            txt = '\n'.join(code_buf)
            flowables.append(Preformatted(txt, CODE))
            code_buf = []

    while i < len(lines):
        line = lines[i]

        # Code fence
        if line.startswith('```'):
            flush_para()
            if in_code:
                flush_code()
                in_code = False
            else:
                in_code = True
            i += 1
            continue
        if in_code:
            code_buf.append(line)
            i += 1
            continue

        stripped = line.strip()

        # Headings
        if stripped.startswith('# '):
            flush_para()
            flowables.append(Paragraph(md_inline_to_rl(stripped[2:].strip()), H1))
            i += 1
            continue
        if stripped.startswith('## '):
            flush_para()
            flowables.append(Paragraph(md_inline_to_rl(stripped[3:].strip()), H2))
            i += 1
            continue
        if stripped.startswith('### '):
            flush_para()
            flowables.append(Paragraph(md_inline_to_rl(stripped[4:].strip()), H3))
            i += 1
            continue
        if stripped.startswith('#### '):
            flush_para()
            flowables.append(Paragraph(md_inline_to_rl(stripped[5:].strip()), H4))
            i += 1
            continue

        # HR
        if re.match(r'^-{3,}$|^\*{3,}$|^_{3,}$', stripped):
            flush_para()
            flowables.append(HRFlowable(width='100%', thickness=0.5,
                                       color=HexColor('#ccc'),
                                       spaceBefore=6, spaceAfter=6))
            i += 1
            continue

        # Table
        if '|' in stripped and i + 1 < len(lines) and re.match(
                r'^\|?\s*[-:|\s]+\|?\s*$', lines[i + 1].strip()):
            flush_para()
            rows, new_i = parse_table(lines, i)
            tbl = build_table_flowable(rows)
            if tbl is not None:
                flowables.append(tbl)
                flowables.append(Spacer(1, 6))
            i = new_i
            continue

        # Bullet list
        if re.match(r'^(\s*)[-*+] ', line):
            flush_para()
            text = re.sub(r'^(\s*)[-*+] ', '', line)
            flowables.append(Paragraph('• ' + md_inline_to_rl(text), BULLET))
            i += 1
            continue

        # Numbered list
        if re.match(r'^\s*\d+\. ', line):
            flush_para()
            m = re.match(r'^\s*(\d+)\. (.*)', line)
            num, rest = m.group(1), m.group(2)
            flowables.append(Paragraph(f'{num}. ' + md_inline_to_rl(rest), BULLET))
            i += 1
            continue

        # Blockquote
        if stripped.startswith('> '):
            flush_para()
            flowables.append(Paragraph(md_inline_to_rl(stripped[2:].strip()), QUOTE))
            i += 1
            continue

        # Blank line -> paragraph break
        if not stripped:
            flush_para()
            i += 1
            continue

        # Accumulate paragraph
        para_buf.append(stripped)
        i += 1

    flush_para()
    flush_code()
    return flowables


def convert_file(md_path: Path, pdf_path: Path):
    md_text = md_path.read_text(encoding='utf-8')
    flowables = md_to_flowables(md_text)
    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=A4,
        leftMargin=15 * mm, rightMargin=15 * mm,
        topMargin=18 * mm, bottomMargin=15 * mm,
        title=md_path.stem.replace('_', ' '),
        author='SecurityBlogs',
    )

    def footer(canvas, doc):
        canvas.saveState()
        canvas.setFont('Helvetica', 8)
        canvas.setFillColor(HexColor('#888'))
        canvas.drawString(15 * mm, 8 * mm, md_path.stem.replace('_', ' '))
        canvas.drawRightString(A4[0] - 15 * mm, 8 * mm, f'Page {doc.page}')
        canvas.restoreState()

    doc.build(flowables, onFirstPage=footer, onLaterPages=footer)


def main():
    if not MD_DIR.exists():
        print(f'No markdown directory at {MD_DIR}', file=sys.stderr)
        sys.exit(1)
    md_files = sorted(MD_DIR.glob('*.md'))
    if not md_files:
        print('No .md files found in Documentation/Markdown/')
        sys.exit(0)
    for md in md_files:
        pdf = PDF_DIR / (md.stem + '.pdf')
        try:
            convert_file(md, pdf)
            print(f'  OK  {md.name}  ->  {pdf.name}')
        except Exception as e:
            print(f' FAIL {md.name}: {e}', file=sys.stderr)


if __name__ == '__main__':
    main()
