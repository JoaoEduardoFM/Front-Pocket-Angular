export class AppConstants{

    //Endpoints usuário
    public static get baseServidor(): String { return "http://localhost:8080/"}

    public static get baseLogin(): string {return this.baseServidor + "contexto projeto/login"}

    public static get baseUrlUsuario(): string {return this.baseServidor + "usuario/"}

    public static get usuariosUrl(): string {return this.baseUrlUsuario + "/buscaUsuarios"}

    public static get deleteusuariosUrl(): string {return this.baseUrlUsuario + "deletaUsuario/"}

    public static get cadastroUsuarioUrl(): string {return this.baseUrlUsuario + "cadastraUsuario/"}

    //Endpoints número
    public static get baseUrlNumero(): string {return this.baseServidor + "Numero/"}

    public static get buscaNumeroPk(): string {return this.baseUrlNumero + "buscaPorUsuarioPk/"}

    public static get deleteNumeroUrl(): string {return this.baseUrlNumero + "deletaNumero/"}

    public static get cadastroNumeroUrl(): string {return this.baseUrlNumero + "cadastraNumero/"}

    //Endpoints produto
    public static get baseUrlProduto(): string {return this.baseServidor + "Produto/"}

    public static get buscaProdutos(): string {return this.baseUrlProduto + "/buscaProdutos"}

    public static get buscaIDProduto(): string {return this.baseUrlProduto + "buscaPorID/"}

    public static get deleteProdutoUrl(): string {return this.baseUrlProduto + "deletaProduto/"}

    public static get cadastroProdutoUrl(): string {return this.baseUrlProduto + "cadastraProduto/"}


}