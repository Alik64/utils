import FileUploader from "./components/FileUploader";

function App() {
  return (
    <div className="App">
      <FileUploader
        multiple
        onFinish={(value) => console.log("value:", value)}
      />
    </div>
  );
}

export default App;
