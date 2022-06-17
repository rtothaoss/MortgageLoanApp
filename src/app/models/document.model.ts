export class Document {
    public length: number;
    public chunkSize: number;
    public uploadDate: Date;
    public filename: string;
    public contentType: string;
    public metaData: string;


    constructor( length: number, chunkSize: number, uploadDate: Date, filename: string, contentType: string, metaData: string) {
        this.length = length,
        this.chunkSize = chunkSize,
        this.uploadDate = uploadDate,
        this.filename = filename,
        this.contentType = contentType,
        this.metaData = metaData
    }



}