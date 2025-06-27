
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stethoscope, Users, UserCheck, Calendar, FileText, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DoctorDashboard from "@/components/DoctorDashboard";
import ReceptionistDashboard from "@/components/ReceptionistDashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const { toast } = useToast();

  const handleLogin = (role) => {
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Demo login - in real app, this would connect to Firebase Auth
    console.log(`Login attempt for ${role}:`, loginData);
    setUserRole(role);
    setIsLoggedIn(true);
    toast({
      title: "Login Successful",
      description: `Welcome, ${role}!`,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setLoginData({ email: '', password: '' });
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {userRole === 'doctor' ? (
          <DoctorDashboard onLogout={handleLogout} />
        ) : (
          <ReceptionistDashboard onLogout={handleLogout} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full mr-3">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Clinic Management System</h1>
          </div>
          <p className="text-xl text-gray-600">Streamlining healthcare communication and patient management</p>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <UserCheck className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-blue-800">Patient Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">Efficient patient registration, token generation, and queue management</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-green-800">Prescription Handling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">Digital prescription management and patient history tracking</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Activity className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-purple-800">Real-time Communication</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">Seamless communication between doctors and reception staff</p>
            </CardContent>
          </Card>
        </div>

        {/* Login Section */}
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login to System</CardTitle>
            <CardDescription className="text-center">
              Access your dashboard as a Doctor or Receptionist
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="doctor" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="doctor" className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  Doctor
                </TabsTrigger>
                <TabsTrigger value="receptionist" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Receptionist
                </TabsTrigger>
              </TabsList>

              <TabsContent value="doctor" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="doctor-email">Email</Label>
                  <Input
                    id="doctor-email"
                    type="email"
                    placeholder="doctor@clinic.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-password">Password</Label>
                  <Input
                    id="doctor-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                </div>
                <Button 
                  onClick={() => handleLogin('doctor')} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Login as Doctor
                </Button>
              </TabsContent>

              <TabsContent value="receptionist" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="receptionist-email">Email</Label>
                  <Input
                    id="receptionist-email"
                    type="email"
                    placeholder="reception@clinic.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receptionist-password">Password</Label>
                  <Input
                    id="receptionist-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                </div>
                <Button 
                  onClick={() => handleLogin('receptionist')} 
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Login as Receptionist
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Demo credentials */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo: Use any email and password to login</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
