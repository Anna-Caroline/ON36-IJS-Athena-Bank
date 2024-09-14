export class DocumentValidator {
    public isValid(doc: string): boolean | string {
        if (!this.hasValidLength(doc)) {
            throw new Error('Invalid argument length or document number.');
        }

        if (this.hasValidCheckDigits(doc)) {
            return this.cleanDocument(doc);
        }

        throw new Error('Invalid document number.');
    }

    private cleanDocument(id: string): string {
        return id.replace(/[^\d]+/g, '');
    }

    private hasValidLength(doc: string): boolean {
        return doc.length === 11 || doc.length === 14;
    }

    private hasValidCheckDigits(doc: string): boolean {
        const arr = doc.split('').map(Number);
        return doc.length === 11 ? this.validatePersonalId(arr) : this.validateBusinessId(arr);
    }

    private validatePersonalId(arr: number[]): boolean {
        return this.validateCheckDigit(arr, 9, 10) && this.validateCheckDigit(arr, 10, 11);
    }

    private validateBusinessId(arr: number[]): boolean {
        return this.validateCheckDigit(arr, 12, 5, 2) && this.validateCheckDigit(arr, 13, 6, 2);
    }

    private validateCheckDigit(arr: number[], checkDigitIndex: number, startWeight: number, restLimit: number = 10): boolean {
        let sum = 0;
        let weight = startWeight;

        for (let i = 0; i < checkDigitIndex; i++) {
            sum += arr[i] * weight;
            weight = weight === 2 ? 9 : weight - 1;
        }

        const rest = sum % 11;
        const checkDigit = rest < 2 ? 0 : 11 - rest;
        return checkDigit === arr[checkDigitIndex];
    }
}
