import { Injectable } from '@nestjs/common';
import fileUpload from "express-fileupload";
import aws from "aws-sdk"
import { getRandomHashedString } from '@app/lib/helper';
@Injectable()
export class UploadService {
    driver:string

    constructor(driver:string){
        this.driver = driver
    }

  private async uploadToS3(file: fileUpload.UploadedFile, folder: string): Promise<string> {

    // S3 config
    const s3EndPoint = new aws.Endpoint(process.env.storageEndpoint)
    const s3 = new aws.S3({
        region: process.env.storageRegion,
        endpoint: s3EndPoint,
        accessKeyId: process.env.storageAccessKeyId,
        secretAccessKey: process.env.storageSecretAccessKey
    })

    let assignedName = `${getRandomHashedString(10)}.${file.mimetype.split("/")[1]}`
    const params = {
        Bucket: process.env.storageBucket,
        Key: `${folder}/${assignedName}`,
        Body: file.data
    }

    try {
        const data = await s3.upload(params).promise();
        return data.Location;
    } catch (error) {
        throw "Unable to upload to bucket."
    }
}


  private async uploadLocal(file: fileUpload.UploadedFile, folder: string): Promise<string> {
    let assignedName = `${getRandomHashedString(10)}.${file.mimetype.split("/")[1]}`

    try {
        await file.mv(`static/${folder}/${assignedName}`)
        return `http://${process.env.domainName}/static/${folder}/${assignedName}`
    } catch (error) {
        throw "Unable to move uploaded file."
    }
}


  async uploadToLocal(file:fileUpload,folder:string):Promise<Object> {
   try {
    let uploadedResult
    if(this.driver === "s3"){
        const filePath: string = await this.uploadToS3(file, folder)

        uploadedResult = {
            size : file.size,
            encoding : file.encoding,
            mimeType : file.mimetype,
            path : filePath,
            uploadedType : "s3"

        }

    }else{
        const filePath = await this.uploadLocal(file, folder)

        uploadedResult = {
            size : file.size,
            encoding : file.encoding,
            mimeType : file.mimetype,
            path : filePath,
            uploadedType : "local-disk"

        }
    }
    return uploadedResult
   } catch (error) {
    throw error
   }
  }
}
