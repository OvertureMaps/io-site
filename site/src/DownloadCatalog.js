import manifest from './06-24-manifest.json';

const awsbasepath = 'https://overturemaps-us-west-2.s3.amazonaws.com/release/';

export function getDownloadCatalog(bbox){
   let fileCatalog = [];

   const versionPath = awsbasepath + manifest.version;

   manifest.themes.forEach( theme => {
         theme.types.forEach(type => {

            if (type.name !== 'building') return;

            type.files.forEach(file => {
               let newName = `${versionPath}${theme.relative_path}${type.relative_path}/${file.name}`
               if (intersects(bbox, file.bbox)) {
                  fileCatalog.push( newName )
               }
            })
         })
      }
   )

   return fileCatalog;
}


// Calculate intersection given 4-item bbox list of [minx, miny, maxx, maxy]
function intersects(bb1, bb2) {
   return (
      bb1[0] < bb2[2] && 
      bb1[2] > bb2[0] && 
      bb1[1] < bb2[3] && 
      bb1[3] > bb2[1]
   );
}
//"https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-06-13-beta.1/theme=admins/type=administrative_boundary/part-00000-7b8d0781-120d-4bf4-ba8a-752423a2975b-c000.zstd.parquet"