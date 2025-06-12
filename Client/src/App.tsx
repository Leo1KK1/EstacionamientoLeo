import Form from "./Components/Form"


function App() {
 

  return (
    <>
      <header className="blue-gradient py-5">
        <div className="max-w-5x1 mx-auto flex justify-between ">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            ESTACIONAMIENTOLEO
            </h1>
        
        </div>
      </header>
      <section className="red-gradient py-5">
        
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>

      </section>
    </>
  )
}

export default App
