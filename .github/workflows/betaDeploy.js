module.exports =async ({context,exec,github})=>{
  const currentPRContainsBeta=context.payload.pull_request.labels.find((label)=>label.name==='beta');
  if(currentPRContainsBeta){
    console.log('Current PR contains Beta tag');
    return;
  }
  console.log('Current PR does not contains Beta tag');
  await exec.exec('npm -v');
  const result= await github.rest.pulls.list({
    owner: context.repo.owner,
    repo: context.repo.repo,
    state: 'open',
  });
  const containsBeta=!!result.data.find((pr)=> !!pr.labels.find((label)=>label.name==='beta'));
  console.log('Any Open PR contains Beta : ', containsBeta);
  await exec.exec('git branch --show-current')        
}
