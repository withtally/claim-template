import dictionary from '~/config/dictionaryConfig.json'

export const getTextFromDictionary = (path: string)=> {
  const arrOfKeys = path.split('_')
  let item = dictionary;
  for(const key of arrOfKeys){
    item = item[key];
  }
  if(!item || typeof item !== 'string'){
    console.error('This key do not exist!')
    return;
  }
  return item;

}