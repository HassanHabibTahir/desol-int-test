"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { vehicleForm } from "@/services/vehicle";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface VehicleFormData {
  carModel: string;
  price: number;
  phoneNumber: string;
  maxPictures: number;
  city: string;
  pictures: FileList;
  api?:string
}

const VehicleForm: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<VehicleFormData>();

  const maxPictures = watch("maxPictures");

  const onSubmit = async(data: VehicleFormData) => {
    if (selectedFiles.length === 0) {
      setError("pictures", {
        type: "manual",
        message: `Please upload exactly ${data.maxPictures} pictures.`,
      });
      return;
    }

    if (selectedFiles.length < data.maxPictures) {
      setError("pictures", {
        type: "manual",
        message: `Please upload exactly ${data.maxPictures} pictures.`,
      });
      return;
    }
    const _data = {
      ...data,
      pictures: selectedFiles,
    };
    const formData = new FormData();
    formData.append("carModel", _data.carModel);
    formData.append("price", _data.price.toString());
    formData.append("phoneNumber", _data.phoneNumber);
    formData.append("maxPictures", _data.maxPictures.toString());
    formData.append("city", _data.city);

    // Append each selected file to FormData
    selectedFiles.forEach((file) => {
      formData.append("pictures", file);
    });
    try {
        setLoading(true);
       const response = await vehicleForm(formData);
        console.log("Response:", response.data);
        setSelectedFiles([]);
        reset(); 
        clearErrors();
      } catch (error) {
        console.error("Error uploading data:", error);
        setError("api", { type: "manual", message: "Failed to upload data. Please try again." });

      }finally {
        setLoading(false); // End loading
      }

    console.log("Form Data:", formData);
    setSelectedFiles([]);
    clearErrors();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setSelectedFiles((prevFiles) => {
        const newFiles = [...prevFiles, ...filesArray];
        if (newFiles.length > maxPictures) {
          setError("pictures", {
            type: "manual",
            message: `Cannot upload more than ${maxPictures} pictures.`,
          });
          return prevFiles;
        }
        clearErrors("pictures");
        return newFiles;
      });
      event.target.value = '';
    }
  };

  const renderThumbnails = () => {
    return selectedFiles.map((file, index) => (
      <div key={index} className="w-20 h-20 border rounded-md overflow-hidden">
        <img
          src={URL.createObjectURL(file)}
          alt={`Thumbnail ${index + 1}`}
          className="h-[100%] w-[100%] object-cover"
        />
      </div>
    ));
  };

  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[100%] ">
 
        <h2 className="text-2xl font-bold text-center mb-5">
          Submit Vehicle Information
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div >
            <div className="flex-1">
              <Input
                id="carModel"
                type="text"
                label="Car Model"
                register={register("carModel", {
                  required: "Car model is required",
                  minLength: { value: 3, message: "Minimum length is 3" },
                })}
                error={errors.carModel?.message}
              />
            </div>
            <div className="flex-1">
              <Input
                id="price"
                type="number"
                label="Price"
                register={register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
                error={errors.price?.message}
              />
            </div>
          </div>

          <Input
            id="phoneNumber"
            type="tel"
            label="Phone Number"
            register={register("phoneNumber", {
              required: "Phone number is required",
              minLength: { value: 11, message: "Must be exactly 11 digits" },
              maxLength: { value: 11, message: "Must be exactly 11 digits" },
              pattern: { value: /^[0-9]+$/, message: "Must be a number" },
            })}
            error={errors.phoneNumber?.message}
          />

          <div>
            <span className="block text-sm font-medium text-gray-700">
              Select City
            </span>
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Lahore"
                  {...register("city", {
                    required: "City selection is required",
                  })}
                  className="mr-2"
                />
                Lahore
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Karachi"
                  {...register("city", {
                    required: "City selection is required",
                  })}
                  className="mr-2"
                />
                Karachi
              </label>
            </div>
            {errors.city && (
              <p className="text-red-500 text-xs">{errors.city.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="maxPictures"
              className="block text-sm font-medium text-gray-700"
            >
              Max Number of Pictures
            </label>
            <select
              id="maxPictures"
              {...register("maxPictures", {
                required: "Max number of pictures is required",
              })}
              className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                errors.maxPictures ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            {errors.maxPictures && (
              <p className="text-red-500 text-xs">
                {errors.maxPictures.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="pictures"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Pictures
            </label>
            <div className="flex items-center space-x-3 mt-1">
              <input
                id="pictures"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                multiple
                className={`block w-full border rounded-md px-3 py-2 ${
                  errors.pictures ? "border-red-500" : "border-gray-300"
                }`}
                disabled={selectedFiles.length >= maxPictures}
              />
              <p className="text-xs text-gray-500">
                Up to {maxPictures} pictures.
              </p>
            </div>
            {errors.pictures && (
              <p className="text-red-500 text-xs">{errors.pictures.message}</p>
            )}
          </div>

          <div className="flex space-x-2 mt-3">{renderThumbnails()}</div>

          <Button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Submit"}
          </Button>
          {errors.api && <p className="text-red-500 text-xs">{errors.api.message}</p>}  

        </form>
      </div>
    </div>
  );
};

export default VehicleForm;
