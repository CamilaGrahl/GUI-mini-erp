import MichiGif from '../img/giphy.gif';
export default function Reports() {
    return (
        <div className="flex flex-col items-center bg-gradient-to-br from-purple-300 to-pink-300 min-h-[calc(100vh-73px)]">
            <span className="block text-sm font-medium text-gray-700 my-5">
                Esta sección aún no está implementada...
            </span>

            <div className="max-w-sm bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center">
                <img
                    src={MichiGif}
                    alt="Michi programando"
                    className="w-80 h-80 object-cover rounded-lg"
                />

                <h2 className="text-lg font-semibold text-gray-800">
                    En proceso...
                </h2>

                <p className="text-gray-600 text-sm mt-1">
                    El michi full-stack developer se está esforzando por tener la página funcionando lo antes posible 🐱‍💻
                </p>
            </div>
        </div>
    )
}
