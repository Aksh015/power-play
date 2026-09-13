import os

files = [f for f in os.listdir('public') if f.endswith('.jpg') and len(f) > 20]
html = ['<!DOCTYPE html><html><head><style>body{display:flex;flex-wrap:wrap;gap:10px;}div{text-align:center;}img{width:220px;height:160px;object-fit:cover;}</style></head><body>']
for f in files:
    html.append(f'<div><img src="public/{f}"><br><small style="font-size:10px">{f}</small></div>')
html.append('</body></html>')

with open('catalog.html', 'w', encoding='utf-8') as out:
    out.write('\n'.join(html))
print('Generated catalog.html with', len(files), 'images')
