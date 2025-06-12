import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { categories } from "../data/categories";
import { Activity } from "../Types";

//tenemos un componente y lo estamos exportando
export default function Form() {
  const isValidActivity = () => {
    const { name, calorias } = activity;
    return name.trim() !== "" && calorias > 0;
  };

  const [activity, setActivity] = useState<Activity>({
    category: 1,
    name: "",
    calorias: 0,
  });

  // Estado para almacenar los registros y cargarlos desde localStorage
  const [records, setRecords] = useState<Activity[]>([]);

  const [editIndex, setEditIndex] = useState<number | null>(null); // Estado para manejar el índice del registro en edición

  // Función para cargar los registros desde localStorage al montar el componente
  useEffect(() => {
    const storedRecords = localStorage.getItem("records");
    if (storedRecords) {
      setRecords(JSON.parse(storedRecords));
    }
  }, []);

  // Función para guardar los registros en localStorage
  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem("records", JSON.stringify(records));
    }
  }, [records]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calorias"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isValidActivity()) {
      if (editIndex !== null) {
        // Actualizar el registro en edición
        const updatedRecords = records.map(
          (record, index) => (index === editIndex ? { ...activity } : record) // Crear una copia del objeto actualizado
        );
        setRecords(updatedRecords); // Actualizar el estado de los registros
        setEditIndex(null); // Salir del modo de edición
      } else {
        // Agregar un nuevo registro
        setRecords([...records, { ...activity }]); // Crear una copia del objeto antes de agregarlo
      }

      // Reiniciar el formulario
      setActivity({ category: 1, name: "", calorias: 0 });
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index); // Establecer el índice del registro en edición
    setActivity({ ...records[index] }); // Crear una copia del registro para evitar mutaciones directas
  };

  const handleDelete = (index: number) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords); // Eliminar el registro seleccionado
  };

  const handleClearRecords = () => {
    setRecords([]); // Limpiar la lista de registros
    localStorage.removeItem("records"); // Limpiar los registros en localStorage
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-700 text-center mb-8 tracking-wide">
        Estacionamiento 602
      </h1>
      <form
        className="space-y-5 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 shadow-2xl p-10 rounded-2xl border-4 border-gray-300"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="category" className="font-bold text-gray-600">
            Servicio :
          </label>
          <select
            className="border-2 border-gray-300 p-2 w-full bg-white text-gray-700 font-semibold focus:ring-4 focus:ring-gray-200 rounded-none"
            id="category"
            value={activity.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="name" className="font-bold text-gray-600">
            Nombre del cliente :
          </label>
          <input
            id="name"
            type="text"
            className="border-2 border-gray-300 p-2 text-gray-700 font-semibold bg-white focus:ring-4 focus:ring-gray-200 rounded-none"
            placeholder="Ingresa el nombre del cliente"
            value={activity.name}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="calorias" className="font-bold text-gray-600">
            Precio:
          </label>
          <input
            id="calorias"
            type="number"
            className="border-2 border-gray-300 p-2 text-gray-700 font-semibold bg-white focus:ring-4 focus:ring-gray-200 rounded-none"
            placeholder="Cantidad a pagar $"
            value={activity.calorias}
            onChange={handleChange}
          />
          <input
            type="submit"
            className="bg-gradient-to-r from-gray-400 via-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 w-full p-2 font-bold uppercase text-gray-700 cursor-pointer rounded-xl shadow-lg transition-all duration-300 disabled:opacity-10"
            value={
              editIndex !== null ? "Actualizar registro" : "Guardar registro"
            }
            disabled={!isValidActivity()}
          />
        </div>
      </form>
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-extrabold text-gray-600 drop-shadow-lg">
          Registros:
        </h2>

        {records.length === 0 ? (
          <p className="text-gray-500 font-bold bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-2">
            No hay registros aún. / Sin registros.
          </p>
        ) : (
          <ul className="space-y-3">
            {records.map((record, index) => (
              <li
                key={index}
                className="border-4 border-gray-300 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 p-4 shadow-xl mx-auto max-w-3xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  {/* Servicio */}
                  <div className="bg-gray-100 border border-gray-300 p-4 shadow-md text-center">
                    <h3 className="font-bold text-gray-600 mb-1">Servicio</h3>
                    <p className="text-gray-700 font-bold">
                      {categories.find((cat) => cat.id === record.category)?.name}
                    </p>
                  </div>

                  {/* Nombre */}
                  <div className="bg-gray-100 border border-gray-300 p-4 shadow-md text-center">
                    <h3 className="font-bold text-gray-600 mb-1">Nombre</h3>
                    <p className="text-gray-700 font-bold">{record.name}</p>
                  </div>

                  {/* Precio */}
                  <div className="bg-gray-100 border border-gray-300 p-4 shadow-md text-center">
                    <h3 className="font-bold text-gray-600 mb-1">Precio</h3>
                    <p className="text-gray-800 font-extrabold text-lg">
                      ${record.calorias}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-300 text-gray-700 font-bold py-1 px-3 rounded-xl shadow transition-all"
                    onClick={() => handleEdit(index)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-400 hover:to-gray-200 text-gray-700 font-bold py-1 px-3 rounded-xl shadow transition-all"
                    onClick={() => handleDelete(index)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          className="bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-400 hover:to-gray-200 text-gray-700 font-bold py-2 px-4 rounded-xl mb-4 shadow-lg transition-all"
          onClick={handleClearRecords}
        >
          Limpiar registros
        </button>
      </div>
    </>
  );
}
