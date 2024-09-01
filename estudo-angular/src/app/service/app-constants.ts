export class AppConstants{

    //Endpoints usuário
    public static get baseServidor(): String { return "http://localhost:8080/"}

    public static get baseLogin(): string {return this.baseServidor + "contexto projeto/login"}

    public static get baseUrl(): string {return this.baseServidor + "usuario/"}

    public static get usuariosUrl(): string {return this.baseUrl + "/buscaUsuarios"}

    public static get deleteusuariosUrl(): string {return this.baseUrl + "deletaUsuario/"}

    public static get cadastroUsuarioUrl(): string {return this.baseUrl + "cadastraUsuario/"}

    //Endpoints número
    public static get baseUrlNumero(): string {return this.baseServidor + "Numero/"}

    public static get buscaNumeroPk(): string {return this.baseUrlNumero + "buscaPorUsuarioPk/"}

    public static get deleteNumeroUrl(): string {return this.baseUrlNumero + "deletaNumero/"}

    public static get cadastroNumeroUrl(): string {return this.baseUrlNumero + "cadastraNumero/"}

    //Endpoints produto
    public static get baseUrlProduo(): string {return this.baseServidor + "Produto/"}

    public static get buscaIDProduto(): string {return this.baseUrlNumero + "buscaPorId/"}

    public static get deleteProdutoUrl(): string {return this.baseUrlNumero + "deletaProduto/"}

    public static get cadastroProdutoUrl(): string {return this.baseUrlNumero + "cadastraProduto/"}


}