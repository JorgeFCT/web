import BrownButton from "../../components/BrownButton";
import TextInput from "../../components/TextInput";

const BusinessForm = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="container mx-auto">
                <div className="mt-10 text-center">
                    <h3 className="text-2xl">Rellena el siguiente formulario</h3>
                </div>

                <div className="mt-10 text-center text-white">
                    <h4 className="font-montserrat text-lg mt-3">Conecta tu Metamask para estar verificado y poder editar tu ficha</h4>

                    <div className="mt-3">
                        <BrownButton
                            text="Conectar cartera"
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-10 bg-white p-6 rounded shadow-lg">
                <div className="mb-4 text-center">
                    <TextInput
                        placeholder="businessname*"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="email*"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="telephone"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <button className="border w-full py-2 rounded">
                        [Sector Placeholder]
                    </button>
                    <input
                        type="text"
                        placeholder="speciality"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <select className="w-full p-2 border rounded">
                        <option>Country 1</option>
                        <option>Country 2</option>
                    </select>
                    <input
                        type="text"
                        placeholder="city*"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <input
                        type="text"
                        placeholder="website"
                        className="w-full p-2 border rounded"
                    />
                    <button className="border w-full py-2 rounded">
                        [Discount Placeholder]
                    </button>
                </div>

                <div className="mt-4">
                    <textarea
                        placeholder="writekeywords"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mt-4 text-center">
                    <input
                        type="file"
                        id="img"
                        className="hidden"
                        accept="image/png,image/jpg,image/jpeg"
                    />
                    <label
                        htmlFor="img"
                        className="border-2 border-black py-2 px-6 rounded cursor-pointer bg-white"
                    >
                        selectfile
                    </label>
                </div>

                <div className="mt-2 text-center">
                    <p>[imageselected]</p>
                </div>
            </div>

            <div className="text-center mt-6">
                <h6>*pinmap</h6>
            </div>

            <div className="container mx-auto mt-6 bg-white p-6 rounded shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="street"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="number"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="postcode"
                        className="w-full p-2 border rounded"
                    />
                    <BrownButton
                        text="Search"
                        className={`border w-full py-2 rounded`}
                    />
                </div>
            </div>

            <div className="center mt-6">
                <div id="map" className="w-full h-64 bg-gray-300 rounded shadow" />
            </div>

            <div className="text-center mt-4">
                <h5 className="text-red-600">[status]</h5>
            </div>

            <div className="text-center mt-4">
                <button className="py-2 px-4 rounded">
                    send
                </button>
            </div>

            {/* Modal: Set Discount */}
            <div className="modal">
                <div className="modal-content p-6 bg-white rounded shadow-lg">
                    <h5 className="text-lg font-semibold text-center text-orange-500 mb-2">
                        adddiscount
                    </h5>
                    <p className="mb-4">adddiscountdesc</p>

                    <div className="grid grid-cols-3 gap-4">
                        {[5, 10, 15].map((value) => (
                            <label
                                key={value}
                                className="flex items-center justify-center border rounded p-4 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="discount"
                                    value={value}
                                    className="hidden"
                                />
                                <span>{value}%</span>
                            </label>
                        ))}
                    </div>

                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="custom discount"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessForm;
