import os
files = ['SixPack.jsx','Chest.jsx','Strength.jsx','Flexibility.jsx','ExerciseModal.jsx']
for f in files:
    p = os.path.join('C:/Users/Administrator/Desktop/play/gym-platform/frontend/src/components', f)
    with open(p) as fh:
        s = fh.read()
    s = s.replace('title={ demonstration}', 'title={${e.name} demonstration}')
    s = s.replace('title={ demonstration}', 'title={${exercise.name} demonstration}')
    with open(p,'w') as fh:
        fh.write(s)
print('ok')
