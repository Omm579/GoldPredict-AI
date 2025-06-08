import React, { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
    
    if (csvFile) {
      handleFileUpload(csvFile);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    setUploadStatus('uploading');
    
    try {
      // Simulate upload processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      onFileUpload(file);
      setUploadStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => setUploadStatus('idle'), 3000);
    } catch (error) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const getStatusContent = () => {
    switch (uploadStatus) {
      case 'uploading':
        return (
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">Processing your data...</p>
          </div>
        );
      case 'success':
        return (
          <div className="text-center text-green-600">
            <CheckCircle className="w-8 h-8 mx-auto mb-2" />
            <p>File uploaded successfully!</p>
          </div>
        );
      case 'error':
        return (
          <div className="text-center text-red-600">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p>Upload failed. Please try again.</p>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Upload Your Gold Price Data
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Drop your CSV file here or click to browse
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Supported format: CSV with date and price columns
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div
        className={`border-2 border-dashed rounded-lg p-8 transition-all duration-300 ${
          isDragOver
            ? 'border-gold-500 bg-gold-50 dark:bg-gold-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gold-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {getStatusContent()}
        
        {uploadStatus === 'idle' && (
          <div className="mt-4">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-6 py-3 bg-gradient-gold text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            >
              <FileText className="w-5 h-5 mr-2" />
              Choose File
            </label>
          </div>
        )}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          CSV Format Requirements:
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• First column: Date (YYYY-MM-DD format)</li>
          <li>• Second column: Price (numeric value)</li>
          <li>• Header row recommended</li>
          <li>• Maximum file size: 10MB</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;