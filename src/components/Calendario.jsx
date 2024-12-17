import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Calendario = () => {
  const [currentView, setCurrentView] = useState("calendar"); // 'calendar', 'time', 'form'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    date: null,
    time: null,
  });

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setCurrentView("time");
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setCurrentView("form");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      date: selectedDate,
      time: selectedTime,
    }));
  };

  const handleBackButton = () => {
    switch (currentView) {
      case "time":
        setCurrentView("calendar");
        break;
      case "form":
        setCurrentView("time");
        break;
      default:
        setCurrentView("calendar");
    }
  };

  const handleNextButton = () => {
    switch (currentView) {
      case "calendar":
        setCurrentView("time");
        break;
      case "time":
        setCurrentView("form");
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Validar que los campos estén llenos
    if (!formData.name || !formData.lastName) {
      alert("Por favor, complete todos los campos");
      return;
    }

    console.log("Formulario enviado:", formData);
    // Aquí podrías enviar los datos a un backend

    // Opcional: Resetear el formulario o mostrar mensaje de éxito
    alert("Cita reservada exitosamente");
  };

  const renderCalendarGrid = () => {
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const rows = [];
    let cells = [];

    // Agregar celdas en blanco para los días antes del primer día del mes
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<td key={`blank-${i}`} className="text-gray-400 p-2"></td>);
    }

    // Agregar días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const isPastDate = date < new Date().setHours(0, 0, 0, 0);

      cells.push(
        <td
          key={`date-${i}`}
          className={`p-2 cursor-pointer text-center ${
            isSelected
              ? "bg-indigo-700 rounded-full text-white"
              : isPastDate
              ? "text-gray-500 cursor-not-allowed"
              : "hover:bg-indigo-700 hover:text-white rounded-full text-black"
          }`}
          onClick={() => !isPastDate && handleDateClick(date)}
        >
          {i}
        </td>
      );

      if (cells.length === 7) {
        rows.push(<tr key={`row-${rows.length}`}>{cells}</tr>);
        cells = [];
      }
    }

    // Completar la última fila si es necesario
    while (cells.length > 0 && cells.length < 7) {
      cells.push(
        <td key={`blank-${cells.length}`} className="text-gray-400 p-2"></td>
      );
    }

    if (cells.length > 0) {
      rows.push(<tr key={`row-${rows.length}`}>{cells}</tr>);
    }

    return rows;
  };

  const renderTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(
        <div
          key={`time-slot-${hour}`}
          className={`p-2 cursor-pointer text-center ${
            selectedTime === hour
              ? "bg-indigo-700 rounded-full text-white"
              : "hover:bg-indigo-700 hover:text-white rounded-full text-black border-2"
          }`}
          onClick={() => handleTimeSelection(hour)}
        >
          {hour}:00
        </div>
      );
    }
    return slots;
  };

  return (
    <div className="bg-transparent text-black rounded md:p-4 p-2">
      {currentView === "calendar" && (
        <div>
          <div className="flex justify-center mb-8">
            <button
              className="mr-4 px-2 py-1 rounded hover:bg-indigo-700"
              onClick={handleBackButton}
              aria-label="Volver"
            >
              <IoIosArrowBack />
            </button>
            <div className="md:text-lg text-xl text-center font-medium">
              {selectedDate.toLocaleString("default", { month: "long" })}{" "}
              {selectedDate.getFullYear()}
            </div>
            <button
              className="ml-4 px-2 py-1 rounded hover:bg-indigo-700"
              onClick={handleNextButton}
              aria-label="Siguiente"
            >
              <IoIosArrowForward />
            </button>
          </div>
          <div className="w-full flex justify-center">
            <table className="md:w-[60%] w-[90%]">
              <thead>
                <tr>
                  {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(
                    (day) => (
                      <th key={day} className="py-2">
                        {day}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>{renderCalendarGrid()}</tbody>
            </table>
          </div>
        </div>
      )}

      {currentView === "time" && (
        <div>
          <p className="text-center mb-4">Selecciona un horario</p>
          <div className="mt-8 grid grid-cols-3 gap-2">{renderTimeSlots()}</div>
          <div className="flex justify-between mt-4">
            <button
              className="bg-indigo-700 text-white rounded-full py-2 px-4 hover:bg-gray-700"
              onClick={handleBackButton}
            >
              Atrás
            </button>
          </div>
        </div>
      )}

      {currentView === "form" && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Reserva tu cita</h3>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                className="border-[2px] focus:outline-indigo-700 focus:placeholder:text-white border-indigo-700 mb-4 bg-transparent text-black rounded p-2 w-full"
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-2">
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                required
                className="border-[2px] focus:outline-indigo-700 focus:placeholder:text-white border-indigo-700 mb-4 bg-transparent text-white rounded p-2 w-full"
                placeholder="Ingresa tu apellido"
              />
            </div>
            <div>
              <label className="block mb-2">
                Fecha y hora seleccionada:
                {selectedDate.toLocaleDateString()} a las {selectedTime}:00
              </label>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-700 to-indigo-400 text-white py-2 px-4 rounded-full hover:bg-[#d7b944]"
              >
                Enviar
              </button>
              <button
                type="button"
                className="bg-indigo-700 text-white rounded-full py-2 px-4 hover:bg-gray-700"
                onClick={handleBackButton}
              >
                Atrás
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Calendario;
