





export const NaoTemEstabelecimento = ({nomeTela}) => {

    return(

        <>
        <div className="pt-6 w-full h-30rem flex flex-column align-items-center align-items-center justify-content-center pb-6">

            <div className="w-7 h-full border-4 border-round-2xl  border-black-alpha-90 bg-white flex align-items-center justify-content-center">

                <div className="  w-11 h-23rem flex flex-column justify-content-center align-items-center ">

                    <span className="pi pi-exclamation-triangle text-8xl text-red-600"></span>

                    <h1 className="text-2xl">Para Cadastrar <strong>{nomeTela}</strong> é necessario possuir um <strong>Estabelecimento</strong> </h1>
                    <h1 className="text-2xl"> e para isso dirija-se a tela <strong>Meu Estabelecimento</strong></h1>
        
                </div>
            </div>
        </div>
        
        </>

    )

}
