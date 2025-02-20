import { useState, useEffect } from "react";
import { TextField, Button, Container, FormControl, Snackbar, Alert } from "@mui/material";
import { jsPDF } from "jspdf";
import CropImage from "./components/crop/cropimage";
import page2Background from "./assets/playas_del_conchal_page_2.jpg"
import background from "./assets/playas_del_conchal_tag.jpg"

function MudanzasForm() {
  const [formData, setFormData] = useState({
    nombrePropietario: "",
    marcaVehiculo: "",
    placas: "",
    departamento: "",
  });

  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImages, setCroppedImages] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para el Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Mensaje del Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Severidad del Snackbar

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 595;
      canvas.height = 842;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 595, 842);
      setBackgroundImage(canvas.toDataURL("image/jpeg"));
    };
    img.src = background;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage) => {
    setCroppedImages((prevImages) => [...prevImages, croppedImage]);
    setImageSrc(null);
    setSnackbarMessage("Imagen agregada correctamente."); // Mensaje de éxito
    setSnackbarSeverity("success");
    setSnackbarOpen(true); // Abre el Snackbar
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false); // Cierra el Snackbar
  };

  const generatePDF = () => {
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });

    if (backgroundImage) {
      pdf.addImage(backgroundImage, "JPEG", 0, 0, 446, 631);
    }

    pdf.text(formData.nombrePropietario, 100, 190);
    pdf.text(formData.marcaVehiculo, 100, 245);
    pdf.text(formData.placas, 100, 295);
    pdf.text(formData.departamento, 100, 350);

    croppedImages.forEach((img) => {
      pdf.addPage();
      pdf.addImage(page2Background, "JPEG", 0, 0, 446, 631);
      pdf.addImage(img, "PNG", 50, 150, 295, 202);
    });

    pdf.save(`Autorizacion_${formData.nombreCompleto}.pdf`);

    //Limpiar los campos
    setFormData({
      nombrePropietario: "",
      marcaVehiculo: "",
      placas: "",
      departamento: "",
    });

    setCroppedImages([]); // Limpiar las imágenes cargadas
  };

  return (
    <Container>
      <form>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Nombre del Propietario"
            name="nombrePropietario"
            value={formData.nombrePropietario}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Departamento"
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Marca de Vehículo"
            name="marcaVehiculo"
            value={formData.marcaVehiculo}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Placas"
            name="placas"
            value={formData.placas}
            onChange={handleChange}
          />
          </FormControl>
        <input type="file" accept="image/*" onChange={handleImageUpload}/>
        {imageSrc && (
          <CropImage
            imageSrc={imageSrc}
            onCropCompleteCallback={handleCropComplete}
            onClose={() => setImageSrc(null)}
          />
        )}
        <Button variant="contained" style={{ marginTop: "20px" }} onClick={generatePDF}>
          Generar PDF
        </Button>
        {/* Snackbar para la confirmación */}
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </form>
    </Container>
  );
}

export default MudanzasForm;