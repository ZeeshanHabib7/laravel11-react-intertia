import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function index({ auth, projects }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Projects
        </h2>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                      >
                        Start Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                      >
                        End Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {projects.data.map((project) => (
                      <tr key={project.id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-100">
                          {project.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {truncateText(project.name, 150)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {truncateText(project.description, 150)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {project.start_date}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {project.end_date}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                          <div className="flex space-x-2">
                            <a
                              href={`/projects/${project.id}/edit`}
                              className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-600"
                            >
                              Edit
                            </a>
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => openModal(project)}
                              className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-600"
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Links */}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Pagination meta={projects.meta} />
        </div>
      </div>

      {/* Modal for full project details */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="max-w-md p-6 mx-auto bg-white rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
              Project Details
            </h3>
            <div className="mt-4">
              <p>
                <strong>ID:</strong> {selectedProject.id}
              </p>
              <p>
                <strong>Name:</strong> {selectedProject.name}
              </p>
              <p>
                <strong>Description:</strong> {selectedProject.description}
              </p>
              <p>
                <strong>Start Date:</strong> {selectedProject.start_date}
              </p>
              <p>
                <strong>End Date:</strong> {selectedProject.end_date}
              </p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}

// Pagination component
function Pagination({ meta }) {
  const { links } = meta;
  return (
    <nav className="flex justify-center">
      <ul className="inline-flex items-center -space-x-px">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.url ? link.url : "#"}
              className={`px-3 py-2 leading-tight ${
                link.active
                  ? "text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-blue-500"
                  : "text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-400"
              } hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white`}
              dangerouslySetInnerHTML={{ __html: link.label }} // Allow for HTML in pagination labels
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function handleDelete(id) {
  if (confirm("Are you sure you want to delete this project?")) {
    // Implement the delete functionality here
    console.log(`Project with id ${id} deleted`);
  }
}
