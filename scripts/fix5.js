const fs=require('fs');
const files=['SixPack.jsx','Chest.jsx','Strength.jsx','Flexibility.jsx','ExerciseModal.jsx'];
for(const f of files){
  const p='C:/Users/Administrator/Desktop/play/gym-platform/frontend/src/components/'+f;
  let s=fs.readFileSync(p,'utf8');
  s=s.replace('title={} demonstration}', 'title={${e.name} demonstration}');
  s=s.replace('title={} demonstration}', 'title={${exercise.name} demonstration}');
  fs.writeFileSync(p,s);
}
console.log('ok');
