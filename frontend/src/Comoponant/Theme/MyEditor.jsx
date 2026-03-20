// import React, { useEffect, useRef } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";

// function MyEditor({ backendValue }) {
//   const editorRef = useRef(null);
//   const quillRef = useRef(null);

//   useEffect(() => {
//     // Wait until div is mounted
//     if (editorRef.current && !quillRef.current) {
//       quillRef.current = new Quill(editorRef.current, {
//         theme: "snow",
//         modules: {
//           toolbar: [
//             [{ header: [1, 2, false] }],
//             ["bold", "italic", "underline"],
//             [{ list: "ordered" }, { list: "bullet" }],
//             ["link", "image"],
//           ],
//         },
//       });

//       // ✅ Backend value set karna yahan
//       if (backendValue) {
//         quillRef.current.root.innerHTML = backendValue;
//       }
//     }

//     // ✅ Agar backendValue badalta hai to update karein
//     if (quillRef.current && backendValue) {
//       quillRef.current.root.innerHTML = backendValue;
//     }
//   }, [backendValue]);

//   return (
//     <div className="row mb-3">
//       <label className="col-md-3 col-form-label">Full Description</label>
//       <div className="col-md-9">
//         <div
//           id="editor"
//           ref={editorRef}
//           style={{ height: "200px", background: "#fff" }}
//         ></div>
//       </div>
//     </div>
//   );
// }

// export default MyEditor;


import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

function MyEditor({ backendValue, onChange }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        },
      });

      // ✅ Quill change event
      quillRef.current.on("text-change", () => {
        const html = quillRef.current.root.innerHTML;
        if (onChange) onChange(html); // parent ko bhej
      });
    }

    // ✅ Backend se value aayi ho to set kar
    if (quillRef.current && backendValue) {
      quillRef.current.root.innerHTML = backendValue;
    }
  }, [backendValue, onChange]);

  return (
    <div className="row mb-3">
      <label className="col-md-3 col-form-label">Full Description</label>
      <div className="col-md-9">
        <div
          id="editor"
          ref={editorRef}
          style={{ height: "200px", background: "#fff" }}
        ></div>
      </div>
    </div>
  );
}

export default MyEditor;
