export default async function validation(url) {
   const getStatus = await statusCheck(url);
   const joinObjects = await Promise.all(
      url.map(async (object, index) => {
         const key = Object.keys(object)[0];
         const value = object[key][0]
         const join = {
            [key]: value,
            status: getStatus[index],
         }
         return join
      })
   )
   return console.log(joinObjects);
}

// Test the recived link
async function statusCheck(url) {
   const extractLink = await urlExtract(url);
   const verify = await Promise.all(
      extractLink.map(async (object) => {
         try {
            const request = await fetch(object);
            return `${request.status} / ${request.statusText}`;
         } catch (error) {
            return handleError(error);
         }
      })
   )
   return verify;
}

// Remove title and group links in array
export async function urlExtract(urlList) {
   const result = await urlList.map((object) => Object.values(object)[0][0]);
   return result;
}

// Handle connection error
function handleError(error) {
   if (error.cause.code === 'ENOTFOUND') {
      return 'website not found!';
   } else {
      return 'something went wrong!'
   }
}
