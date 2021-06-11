export class Document {
    public constructor(document: any) {
        this.description = document.description;
        this.icon = this.mapDocumentCodeToIcon(document);
    }

    public readonly description: string;
    public readonly icon: string;

    private mapDocumentCodeToIcon(document: any) {
        switch (document.code) {
          case 'idSelfie':
            return 'selfie'
          case 'idPassport':
            return 'passport'
          case 'proofOfAddress':
            return 'address'
        }

        return 'unknown'
      }
}
