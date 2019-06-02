export class Pedido {
    public id: number;
    
    constructor(
        public endereco: string,
        public numero: string,
        public complemento: string,
        public formaPagamento: string
    ) { } 

}