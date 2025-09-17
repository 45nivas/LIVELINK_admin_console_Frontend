import React, { useState } from 'react';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';
import { mockDrivers } from '../../../data/mockData';
import type { Driver, Document } from '../../../types/rideshare';

interface DocumentCardProps {
  document: Document;
  driverInfo: Pick<Driver, 'id' | 'firstName' | 'lastName' | 'email'>;
  onApprove: (docId: string) => void;
  onReject: (docId: string, reason: string) => void;
  onViewDocument: (document: Document) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ 
  document, 
  driverInfo, 
  onApprove, 
  onReject, 
  onViewDocument 
}) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'driving_license': return '🪪';
      case 'vehicle_registration': return '📋';
      case 'insurance': return '🛡️';
      case 'identity_card': return '🆔';
      case 'background_check': return '📊';
      default: return '📄';
    }
  };

  const handleReject = () => {
    if (rejectionReason.trim()) {
      onReject(document.id, rejectionReason);
      setRejectionReason('');
      setShowRejectForm(false);
    }
  };

  const isExpiringSoon = document.expiryDate && 
    new Date(document.expiryDate.getTime() - Date.now()) < new Date(30 * 24 * 60 * 60 * 1000); // 30 days

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">{getDocumentTypeIcon(document.type)}</span>
            <div>
              <Text size="lg" weight="semibold" className="text-gray-900">
                {document.type.replace('_', ' ').toUpperCase()}
              </Text>
              <Text size="sm" className="text-gray-600">
                Driver: {driverInfo.firstName} {driverInfo.lastName}
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Text size="sm" className="text-gray-600">Driver ID</Text>
              <Text size="sm" weight="medium">{driverInfo.id}</Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Email</Text>
              <Text size="sm" weight="medium">{driverInfo.email}</Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Uploaded</Text>
              <Text size="sm" weight="medium">
                {document.uploadedAt.toLocaleDateString()}
              </Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Document ID</Text>
              <Text size="sm" weight="medium">{document.id}</Text>
            </div>
          </div>

          {document.expiryDate && (
            <div className="mb-4">
              <Text size="sm" className="text-gray-600">Expiry Date</Text>
              <Text 
                size="sm" 
                weight="medium" 
                className={isExpiringSoon ? 'text-red-600' : 'text-gray-900'}
              >
                {document.expiryDate.toLocaleDateString()}
                {isExpiringSoon && ' ⚠️ Expiring Soon'}
              </Text>
            </div>
          )}

          <div className="flex space-x-2 mb-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
              {document.status.toUpperCase()}
            </span>
            {document.status === 'pending' && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                AWAITING REVIEW
              </span>
            )}
          </div>

          {document.status === 'rejected' && document.rejectionReason && (
            <div className="bg-red-50 rounded-lg p-3 mb-4">
              <Text size="sm" weight="medium" className="text-red-900 mb-1">
                Rejection Reason:
              </Text>
              <Text size="sm" className="text-red-700">
                {document.rejectionReason}
              </Text>
            </div>
          )}

          {document.verifiedAt && document.verifiedBy && (
            <div className="bg-green-50 rounded-lg p-3 mb-4">
              <Text size="sm" weight="medium" className="text-green-900 mb-1">
                Verified by: {document.verifiedBy}
              </Text>
              <Text size="xs" className="text-green-700">
                {document.verifiedAt.toLocaleString()}
              </Text>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-2 ml-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewDocument(document)}
          >
            View Document
          </Button>
          
          {document.status === 'pending' && (
            <>
              <Button
                size="sm"
                variant="primary"
                onClick={() => onApprove(document.id)}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => setShowRejectForm(true)}
              >
                Reject
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Rejection Form */}
      {showRejectForm && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <Text size="sm" weight="medium" className="text-gray-900 mb-2">
            Rejection Reason
          </Text>
          <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Please provide a clear reason for rejection..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
            rows={3}
          />
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="danger"
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
            >
              Confirm Rejection
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setShowRejectForm(false);
                setRejectionReason('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export const VerificationQueue: React.FC = () => {
  const [drivers] = useState<Driver[]>(mockDrivers);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Generate mock documents from drivers
  React.useEffect(() => {
    const mockDocuments: Document[] = [];
    drivers.forEach(driver => {
      if (driver.documents && driver.documents.length > 0) {
        mockDocuments.push(...driver.documents);
      } else {
        // Create mock documents for drivers without documents
        const docTypes = ['driving_license', 'vehicle_registration', 'insurance'];
        docTypes.forEach((type, index) => {
          mockDocuments.push({
            id: `doc_${driver.id}_${index}`,
            type: type as any,
            url: `https://example.com/documents/${driver.id}_${type}.pdf`,
            status: driver.verificationStatus === 'approved' ? 'approved' : 
                   driver.verificationStatus === 'rejected' ? 'rejected' : 'pending',
            uploadedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
            verifiedAt: driver.verificationStatus === 'approved' ? new Date() : undefined,
            verifiedBy: driver.verificationStatus === 'approved' ? 'admin1' : undefined,
            rejectionReason: driver.verificationStatus === 'rejected' ? 
              'Document quality is poor, please resubmit' : undefined,
            expiryDate: type === 'driving_license' ? 
              new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : undefined,
            ownerId: driver.id,
            ownerType: 'driver',
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
            updatedAt: new Date()
          });
        });
      }
    });
    setDocuments(mockDocuments);
  }, [drivers]);

  const filteredDocuments = documents.filter(doc => {
    const driver = drivers.find(d => d.id === doc.ownerId);
    if (!driver) return false;

    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesSearch = 
      driver.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  const handleApprove = (docId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId 
        ? { 
            ...doc, 
            status: 'approved', 
            verifiedAt: new Date(), 
            verifiedBy: 'admin1',
            rejectionReason: undefined
          }
        : doc
    ));
    console.log('Approved document:', docId);
  };

  const handleReject = (docId: string, reason: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId 
        ? { 
            ...doc, 
            status: 'rejected', 
            rejectionReason: reason,
            verifiedAt: undefined,
            verifiedBy: undefined
          }
        : doc
    ));
    console.log('Rejected document:', docId, 'Reason:', reason);
  };

  const handleViewDocument = (document: Document) => {
    console.log('View document:', document);
    // In a real app, this would open the document in a modal or new tab
    window.open(document.url, '_blank');
  };

  const pendingCount = documents.filter(d => d.status === 'pending').length;
  const approvedCount = documents.filter(d => d.status === 'approved').length;
  const rejectedCount = documents.filter(d => d.status === 'rejected').length;
  const expiringCount = documents.filter(d => 
    d.expiryDate && new Date(d.expiryDate.getTime() - Date.now()) < new Date(30 * 24 * 60 * 60 * 1000)
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <Text as="h1" size="4xl" weight="bold" className="text-gray-900 mb-2">
          Verification Queue
        </Text>
        <Text size="base" className="text-gray-600">
          Review and verify driver documents, vehicle registration, and identity verification.
        </Text>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Pending Review</Text>
          <Text size="3xl" weight="bold" className="text-yellow-600">{pendingCount}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Approved</Text>
          <Text size="3xl" weight="bold" className="text-green-600">{approvedCount}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Rejected</Text>
          <Text size="3xl" weight="bold" className="text-red-600">{rejectedCount}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Expiring Soon</Text>
          <Text size="3xl" weight="bold" className="text-orange-600">{expiringCount}</Text>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Text size="sm" weight="medium" className="text-gray-700 mb-2">
              Search Documents
            </Text>
            <input
              type="text"
              placeholder="Search by driver name, email, or document ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <Text size="sm" weight="medium" className="text-gray-700 mb-2">
              Filter by Status
            </Text>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <Text size="sm" weight="medium" className="text-gray-700 mb-2">
              Filter by Type
            </Text>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Documents</option>
              <option value="driving_license">Driving License</option>
              <option value="vehicle_registration">Vehicle Registration</option>
              <option value="insurance">Insurance</option>
              <option value="identity_card">Identity Card</option>
              <option value="background_check">Background Check</option>
            </select>
          </div>
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-4">
        {filteredDocuments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Text size="lg" className="text-gray-500">
              No documents found matching your criteria.
            </Text>
          </div>
        ) : (
          filteredDocuments.map(document => {
            const driver = drivers.find(d => d.id === document.ownerId);
            if (!driver) return null;
            
            return (
              <DocumentCard
                key={document.id}
                document={document}
                driverInfo={{
                  id: driver.id,
                  firstName: driver.firstName,
                  lastName: driver.lastName,
                  email: driver.email
                }}
                onApprove={handleApprove}
                onReject={handleReject}
                onViewDocument={handleViewDocument}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default VerificationQueue;