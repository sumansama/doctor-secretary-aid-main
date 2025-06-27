
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Users, Receipt, LogOut, Hash, User, Phone, Calendar, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReceptionistDashboard = ({ onLogout }) => {
  const [patientForm, setPatientForm] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    condition: ''
  });
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', token: 'T001', age: 35, gender: 'Male', phone: '+1234567890', condition: 'Fever', status: 'waiting', time: '09:30 AM', fee: 50 },
    { id: 2, name: 'Jane Smith', token: 'T002', age: 28, gender: 'Female', phone: '+1234567891', condition: 'Headache', status: 'in-progress', time: '10:00 AM', fee: 50 },
  ]);
  const [nextTokenNumber, setNextTokenNumber] = useState(5);
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setPatientForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateToken = () => {
    const token = `T${String(nextTokenNumber).padStart(3, '0')}`;
    return token;
  };

  const handlePatientRegistration = () => {
    if (!patientForm.name || !patientForm.age || !patientForm.gender || !patientForm.phone || !patientForm.condition) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newPatient = {
      id: Date.now(),
      name: patientForm.name,
      token: generateToken(),
      age: parseInt(patientForm.age),
      gender: patientForm.gender,
      phone: patientForm.phone,
      address: patientForm.address,
      condition: patientForm.condition,
      status: 'waiting',
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      }),
      fee: 50
    };

    setPatients(prev => [...prev, newPatient]);
    setNextTokenNumber(prev => prev + 1);
    
    // Reset form
    setPatientForm({
      name: '',
      age: '',
      gender: '',
      phone: '',
      address: '',
      condition: ''
    });

    toast({
      title: "Patient Registered",
      description: `Token ${newPatient.token} assigned to ${newPatient.name}`,
    });
  };

  const calculateTotalFees = () => {
    return patients.reduce((total, patient) => total + patient.fee, 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusCount = (status) => {
    return patients.filter(patient => patient.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-green-600 p-2 rounded-lg mr-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Receptionist Dashboard</h1>
                <p className="text-sm text-gray-500">Patient registration and token management</p>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Hash className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Waiting</p>
                  <p className="text-2xl font-bold text-gray-900">{getStatusCount('waiting')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <Receipt className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Fees</p>
                  <p className="text-2xl font-bold text-gray-900">${calculateTotalFees()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Hash className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Next Token</p>
                  <p className="text-2xl font-bold text-gray-900">T{String(nextTokenNumber).padStart(3, '0')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="register" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="register" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Register Patient
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Patient List
            </TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Patient Registration</CardTitle>
                <CardDescription>
                  Register a new patient and generate a token number
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={patientForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter patient's full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={patientForm.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="Enter age"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={patientForm.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={patientForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1234567890"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={patientForm.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter address (optional)"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="condition">Condition/Symptoms *</Label>
                    <Input
                      id="condition"
                      value={patientForm.condition}
                      onChange={(e) => handleInputChange('condition', e.target.value)}
                      placeholder="Brief description of symptoms"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Button onClick={handlePatientRegistration} className="w-full">
                      Register Patient & Generate Token
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Patient List</CardTitle>
                <CardDescription>
                  View all registered patients and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No patients registered yet</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {patients.map((patient) => (
                        <div key={patient.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{patient.name}</h3>
                              <p className="text-sm text-gray-600">Token: {patient.token}</p>
                            </div>
                            <Badge className={getStatusColor(patient.status)}>
                              {patient.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span>{patient.age}y, {patient.gender}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <span>{patient.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{patient.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Receipt className="h-4 w-4" />
                              <span>${patient.fee}</span>
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            <p className="text-sm"><strong>Condition:</strong> {patient.condition}</p>
                            {patient.address && (
                              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                <MapPin className="h-4 w-4" />
                                {patient.address}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
