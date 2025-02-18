import { useState } from 'react';

const AddForm = () => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (formData: FormData): Promise<void> => {
    try {
      const response = await fetch('/your-endpoint', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);  // Store message in state
      } else {
        setMessage("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;  // Assert e.target as HTMLFormElement
        const formData = new FormData(formElement);
        await handleSubmit(formData);  // Call the submit handler
      }}
    >
      <div>
        <label htmlFor="productName">Product Name</label>
        <input id="productName" name="productName" type="text" required />
      </div>

      <div>
        <label htmlFor="productDescription">Product Description</label>
        <input id="productDescription" name="productDescription" type="text" required />
      </div>

      <button type="submit">Submit</button>

      {/* Display message after form submission */}
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddForm;
