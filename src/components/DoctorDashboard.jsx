
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Stethoscope, Users, Clock, FileText, LogOut, Search, User, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DoctorDashboard = ({ onLogout }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescription, setPrescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Mock patient data
  const patients = [
    { id: 1, name: 'John Doe', token: 'T001', age: 35, gender: 'Male', condition: 'Fever', status: 'waiting', time: '09:30 AM' },
    { id: 2, name: 'Jane Smith', token: 'T002', age: 28, gender: 'Female', condition: 'Headache', status: 'in-progress', time: '10:00 AM' },
    { id: 3, name: 'Robert Johnson', token: 'T003', age: 45, gender: 'Male', condition: 'Back Pain', status: 'waiting', time: '10:30 AM' },
    { id: 4, name: 'Emily Davis', token: 'T004', age: 32, gender: 'Female', condition: 'Cough', status: 'completed', time: '11:00 AM' },
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.token.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setPrescription('');
  };

  const handlePrescriptionSubmit = () => {
    if (!prescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prescription",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Prescription Saved",
      description: `Prescription for ${selectedPatient?.name} has been saved successfully.`,
    });

    // Reset form
    setPrescription('');
    setSelectedPatient(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
                <p className="text-sm text-gray-500">Manage patients and prescriptions</p>
              </div>
            </div>
            <Button onClick={onLogout} variant="outline" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient Queue */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Patient Queue
                </CardTitle>
                <CardDescription>Today's appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedPatient?.id === patient.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handlePatientSelect(patient)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-sm">{patient.name}</h4>
                            <p className="text-xs text-gray-500">Token: {patient.token}</p>
                          </div>
                          <Badge className={`text-xs ${getStatusColor(patient.status)}`}>
                            {patient.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {patient.time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-700 mt-1">
                          {patient.age}y, {patient.gender} • {patient.condition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patient Details & Prescription */}
          <div className="lg:col-span-2">
            {selectedPatient ? (
              <div className="space-y-6">
                {/* Patient Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Patient Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                        <p className="text-lg font-semibold">{selectedPatient.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Token Number</Label>
                        <p className="text-lg font-semibold">{selectedPatient.token}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Age</Label>
                        <p className="text-lg">{selectedPatient.age} years</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Gender</Label>
                        <p className="text-lg">{selectedPatient.gender}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Condition</Label>
                        <p className="text-lg">{selectedPatient.condition}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Status</Label>
                        <Badge className={getStatusColor(selectedPatient.status)}>
                          {selectedPatient.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Prescription Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Write Prescription
                    </CardTitle>
                    <CardDescription>
                      Enter prescription details for {selectedPatient.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="prescription">Prescription Details</Label>
                        <Textarea
                          id="prescription"
                          placeholder="Enter medicines, dosage, and instructions..."
                          value={prescription}
                          onChange={(e) => setPrescription(e.target.value)}
                          rows={6}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button onClick={handlePrescriptionSubmit} className="flex-1">
                          Save Prescription
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedPatient(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No Patient Selected</h3>
                  <p>Select a patient from the queue to view details and write prescriptions</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
