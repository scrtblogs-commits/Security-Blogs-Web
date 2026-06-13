"""
Builds the JSON payload of records to insert into SB · DOCS · Index.
Reads:
  Documentation/DOCUMENTATION_INDEX.csv
  Documentation/verification_results.json
Outputs:
  Documentation/airtable_records.json  (list of {fields: {...}} objects)
"""
import csv
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
CSV_PATH = HERE / 'DOCUMENTATION_INDEX.csv'
JSON_PATH = HERE / 'verification_results.json'
OUT = HERE / 'airtable_records.json'

# Field IDs from the SB · DOCS · Index table
FIELDS = {
    'Title': 'fld8S8CFn20qitQuq',
    'System Name': 'fldRBNDRTgdTsOvGN',
    'Documentation Type': 'fldHQZIvQdNfuj8CI',
    'Markdown Path': 'fldT2Vb0gumjvZQAt',
    'PDF Path': 'fld3ytWfoSLc2cS8X',
    'PDF Attachment': 'fldGuNvfECXSGN1al',
    'Last Updated': 'fldQW1DrllculqRf5',
    'Verification Status': 'fld0a0JZJ91KZTf4S',
    'Accuracy %': 'fldtfPGRGoz1SHhOc',
    'Developer Safe': 'fldUPLDQAgIqBv9SW',
    'Broken References Summary': 'fldWvxl4uZefSH19T',
}

# Map CSV System Name values to the singleSelect options that exist on the table
SYSTEM_NORMALISE = {
    'All systems (overview)': 'All systems (overview)',
    'PostgreSQL': 'PostgreSQL',
    'Airtable': 'Airtable',
    'Production Server (Phase D)': 'Production Server (Phase D)',
    'All systems (onboarding)': 'All systems (onboarding)',
    'Per-Page': 'Per-Page',
}

# Build verification lookup: doc filename → result
ver = json.loads(JSON_PATH.read_text(encoding='utf-8'))
by_doc = {r['doc']: r for r in ver['results']}


def derive_status(r):
    if r is None:
        return 'Not Verified'
    if r['developer_safe']:
        return 'PASS'
    if r['accuracy_pct'] >= 80:
        return 'REVIEW'
    return 'FAIL'


def derive_broken_summary(r):
    if r is None:
        return ''
    parts = []
    if r['files']['broken']:
        parts.append(f"Files ({len(r['files']['broken'])}): " + ', '.join(r['files']['broken'][:3]))
    if r['endpoints']['broken']:
        parts.append(f"Endpoints ({len(r['endpoints']['broken'])}): " + ', '.join(r['endpoints']['broken'][:3]))
    if r['env_vars']['broken']:
        parts.append(f"Env vars ({len(r['env_vars']['broken'])}): " + ', '.join(r['env_vars']['broken'][:3]))
    if r['pg_tables']['broken']:
        parts.append(f"PG tables ({len(r['pg_tables']['broken'])}): " + ', '.join(r['pg_tables']['broken'][:3]))
    return '\n'.join(parts) if parts else 'None — all references verified'


records = []
with CSV_PATH.open(encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        title = row['Page Name']
        sysn = SYSTEM_NORMALISE.get(row['System Name'], row['System Name'])
        doctype = row['Documentation Type']
        md = row['Markdown Path']
        pdf = row['PDF Path']
        last_upd = row['Last Updated']

        # Look up verification by filename
        doc_filename = Path(md).name if md else None
        v = by_doc.get(doc_filename)

        # Build the fields dict using FIELD IDs
        fields = {
            FIELDS['Title']: title,
            FIELDS['System Name']: sysn,
            FIELDS['Documentation Type']: doctype,
            FIELDS['Markdown Path']: md,
            FIELDS['PDF Path']: pdf,
            FIELDS['Last Updated']: last_upd if last_upd != 'PENDING' else None,
            FIELDS['Verification Status']: derive_status(v),
            FIELDS['Developer Safe']: bool(v['developer_safe']) if v else False,
            FIELDS['Broken References Summary']: derive_broken_summary(v),
        }
        if v is not None:
            fields[FIELDS['Accuracy %']] = float(v['accuracy_pct'])

        # Drop None values (Airtable doesn't accept them on date fields)
        fields = {k: v for k, v in fields.items() if v is not None}
        records.append({'fields': fields})

# Split into batches of 10 (Airtable max per call)
batches = [records[i:i+10] for i in range(0, len(records), 10)]
OUT.write_text(json.dumps(batches, indent=2), encoding='utf-8')
print(f"Wrote {OUT} with {len(records)} records in {len(batches)} batches.")
