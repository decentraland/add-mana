import { buildStatic } from 'dcl-ops-lib/buildStatic'

async function main() {
  const addMana = buildStatic({
    domain: `addmana.decentraland.org`,
    defaultPath: 'index.html',
  })

  return {
    cloudfrontDistribution: addMana.cloudfrontDistribution,
    bucketName: addMana.contentBucket,
  }
}
export = main
