"""
Populates the PDF Attachment field on every record in SB · DOCS · Index.

PREREQUISITE
============
The repo must be pushed to GitHub so the PDFs are reachable via raw URLs.
Default branch is `phase-c-frontend-rewire`; override with env var GITHUB_BRANCH.

Run:
    set AIRTABLE_PAT=patXXXXXXXXXX           (Windows cmd)
    $env:AIRTABLE_PAT="patXXXXXXXXXX"        (PowerShell)
    export AIRTABLE_PAT=patXXXXXXXXXX        (bash)
    python Documentation/attach_pdfs_to_airtable.py

The PAT must have data.records:write scope on the base.
"""
import json
import os
import sys
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError

BASE_ID = 'app4m6OOzymaqPKHX'
TABLE_ID = 'tblp6OviQA5wj67cX'
GITHUB_USER = 'Jonaid880'
GITHUB_REPO = 'Security-Blogs'
GITHUB_BRANCH = os.environ.get('GITHUB_BRANCH', 'phase-c-frontend-rewire')

PAT = os.environ.get('AIRTABLE_PAT')
if not PAT:
    sys.exit('ERROR: set AIRTABLE_PAT env var first.')

# Field IDs from SB · DOCS · Index
FLD_TITLE = 'fld8S8CFn20qitQuq'
FLD_PDF_PATH = 'fld3ytWfoSLc2cS8X'
FLD_PDF_ATTACHMENT = 'fldGuNvfECXSGN1al'

HERE = Path(__file__).resolve().parent


def list_records():
    """Page through all records in the table."""
    out = []
    offset = None
    while True:
        url = f'https://api.airtable.com/v0/{BASE_ID}/{TABLE_ID}?pageSize=100'
        if offset:
            url += f'&offset={offset}'
        req = Request(url, headers={'Authorization': f'Bearer {PAT}'})
        with urlopen(req) as r:
            data = json.loads(r.read())
        out.extend(data.get('records', []))
        offset = data.get('offset')
        if not offset:
            break
    return out


def patch_record(record_id, attachment_url, filename):
    """PATCH a record, setting PDF Attachment to [{url, filename}]."""
    url = f'https://api.airtable.com/v0/{BASE_ID}/{TABLE_ID}/{record_id}'
    body = json.dumps({
        'fields': {
            FLD_PDF_ATTACHMENT: [
                {'url': attachment_url, 'filename': filename}
            ]
        }
    }).encode('utf-8')
    req = Request(url, data=body, method='PATCH', headers={
        'Authorization': f'Bearer {PAT}',
        'Content-Type': 'application/json',
    })
    with urlopen(req) as r:
        return json.loads(r.read())


def main():
    records = list_records()
    print(f'Found {len(records)} records in SB · DOCS · Index')

    ok = 0
    failed = []
    skipped = []
    for rec in records:
        fields = rec.get('fields', {})
        title = fields.get('Title') or fields.get(FLD_TITLE) or '?'
        pdf_path = fields.get('PDF Path') or fields.get(FLD_PDF_PATH)
        if not pdf_path:
            skipped.append((title, 'no PDF Path'))
            continue
        pdf_path = pdf_path.replace('\\', '/').lstrip('/')
        raw_url = (
            f'https://raw.githubusercontent.com/{GITHUB_USER}/{GITHUB_REPO}/'
            f'{GITHUB_BRANCH}/{pdf_path}'
        )
        filename = pdf_path.rsplit('/', 1)[-1]
        try:
            patch_record(rec['id'], raw_url, filename)
            print(f"  OK  {title:50s}  ->  {raw_url}")
            ok += 1
        except HTTPError as e:
            body = e.read().decode('utf-8', errors='ignore')[:200]
            print(f"FAIL  {title:50s}  ->  HTTP {e.code}: {body}")
            failed.append((title, e.code, body))

    print(f"\nAttached: {ok}\nFailed: {len(failed)}\nSkipped: {len(skipped)}")
    if failed:
        sys.exit(1)


if __name__ == '__main__':
    main()
