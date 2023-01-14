import Resolver from '@forge/resolver';
import api,{ route } from '@forge/api';

const resolver = new Resolver();
const requiredSummary = 50;
const requiredDescription = 4;

resolver.define('getText', async (req) => {
  console.log(req);
  console.log('issue key ${req.context.extension.issue.key}');

    const res = await api.asApp().requestJira(route`/rest/api/3/issue/${req.context.extension.issue.key}/`);
    const data = await res.json(); 
    // setIssue(data);
    var summaryScore = data.fields.summary.length/requiredSummary;
    if (summaryScore > 1){
      summaryScore = 1;
    }
    var descScore = data.fields.description.content.length;
    if (descScore > 1){
      descScore = 1;
    }
    //length
    // var HoleYards = descScore + 100 + summaryScore;
    const calculateHoleLength = (updated) => {
      // calculate hole length based on the progress of the issue
      const createdAt = new Date(updated);
      const now = new Date();
      const timeInProgress = now - createdAt;
      const holeLength = timeInProgress / (1000 * 60 * 60); // hours
      return holeLength;
    }

  return descScore + 100 + summaryScore;;
});

export const handler = resolver.getDefinitions();
