# Reorder hero-bis sections: Lumières, MOH, JDC
path = 'index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Markers (unique)
start_jdc = '    <!-- ACTE 3: HERO BIS - Jérusalem du Ciel -->'
start_moh = '    <!-- ACTE 4: HERO BIS - Minhag ou Halakha -->'
start_lum = '    <!-- HERO BIS - La Parole Transmise - Lumières d\'Israël -->'
start_acte6 = '    <!-- ACTE 6: NOS INSPIRATIONS -->'

# Find section boundaries
def find_section(content, start_marker, next_marker):
    i = content.find(start_marker)
    if i < 0:
        return None, None
    j = content.find(next_marker, i)
    if j < 0:
        return i, len(content)
    return i, j

# Extract: from start_marker (inclusive) to just before next_marker
def extract_section(content, start_marker, next_marker):
    i, j = find_section(content, start_marker, next_marker)
    if i is None:
        return None
    return content[i:j].rstrip()

# Order we want: Lumières, MOH, JDC before ACTE 6
# Current order in file: JDC, MOH, Lumières, ACTE 6
jdc_block = extract_section(content, start_jdc, start_moh)
moh_block = extract_section(content, start_moh, start_lum)
lum_block = extract_section(content, start_lum, start_acte6)

if not jdc_block or not moh_block or not lum_block:
    print("Missing block:", "jdc" if not jdc_block else "moh" if not moh_block else "lum")
    exit(1)

# Build new content: everything before JDC + Lumières + MOH + JDC + everything from ACTE 6
before_jdc = content[:content.find(start_jdc)]
from_acte6 = content[content.find(start_acte6):]

new_content = before_jdc + lum_block + "\n\n    " + moh_block.strip().replace(start_moh.strip(), start_moh.strip(), 1) + "\n\n    " + jdc_block.strip().replace(start_jdc.strip(), start_jdc.strip(), 1) + "\n\n    " + from_acte6.lstrip()

# Actually: we need to preserve exact structure. before_jdc is everything up to (not including) start_jdc.
# Then we want: lum_block, moh_block, jdc_block, then from_acte6.
new_content = before_jdc + lum_block + "\n\n" + moh_block + "\n\n" + jdc_block + "\n\n" + from_acte6

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("OK: hero-bis reordered to Lumières, MOH, JDC")
