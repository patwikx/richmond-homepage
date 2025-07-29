"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Users, ChevronDown, Building, User, MailCheck, Briefcase, Maximize, FileText } from 'lucide-react';
import Image from 'next/image';
import { Header } from '@/components/header';
import { createInvestmentInquiry } from '@/actions/actions';


// Unified interface based on the provided image
interface InvestmentInquiry {
  companyName: string;
  companyAddress: string;
  contactPerson: string;
  contactLandline: string;
  contactMobile: string;
  contactEmail: string;
  businessType: string;
  productsServices: string;
  projectedEmployees: string;
  operationsTimeline: string;
  spaceRequirements: string;
  utilityNeeds: string;
  needsAndExpectations: string;
}

const propertyImages = [
  // ... (your propertyImages array remains unchanged)
  { id: 1, url: "https://zhdelzq5lo.ufs.sh/f/5VWIaIba9EoQeoYn5ROxmcCNEbRWDAps07ayQ8BYUokdZtM3", title: "Prime Commercial Lot A", description: "Strategic location with high foot traffic" },
  { id: 2, url: "https://zhdelzq5lo.ufs.sh/f/5VWIaIba9EoQCslsPSdUxYEVqTK4boXtQuMPAc7zJmgw8S6R", title: "Residential Development Site", description: "Perfect for housing projects" },
  { id: 3, url: "https://zhdelzq5lo.ufs.sh/f/5VWIaIba9EoQNTyKWpllVaYuk5J6UZjEx2er71hSvWTqnypi", title: "Industrial Complex", description: "Large-scale manufacturing facility" },
  { id: 4, url: "https://zhdelzq5lo.ufs.sh/f/5VWIaIba9EoQ61j73VZxJNfqYTMLmZ50hboVuGFEarSO3PI4", title: "Mixed-Use Development", description: "Commercial and residential combined" },
  { id: 5, url: "https://zhdelzq5lo.ufs.sh/f/5VWIaIba9EoQ2fM7siHm4In8NcrahiMvBJsHgd0eKoqYZmXS", title: "Waterfront Property", description: "Exclusive coastal development" },
  { id: 6, url: "https://zhdelzq5lo.ufs.sh/f/5VWIaIba9EoQOGM88NgP7JvrEVds4RjxMLq685klUwZInmAT", title: "Business District Lot", description: "Heart of the commercial district" },
  { id: 7, url: "https://zhdelzq5lo.ufs.sh/f/5VWIaIba9EoQhNhXlYQpBPLtFouM7AlbIXcTdjK4aNhOZUVk", title: "Suburban Development", description: "Family-friendly neighborhood" },
  { id: 8, url: "https://zhdelzq5lo.ufs.sh/f/5VWIaIba9EoQcjQ6Cv9IyEzVacXnWLsSGmPJ6BUhO1QRjF7d", title: "Retail Space Complex", description: "High-visibility shopping area" },
  { id: 9, url: "https://zhdelzq5lo.ufs.sh/f/5VWIaIba9EoQUmMeTVDnkjNSFhOYuV1ec9tQbTXCJBR82iw0", title: "Office Building Site", description: "Modern corporate headquarters" },
  { id: 10, url: "https://zhdelzq5lo.ufs.sh/f/5VWIaIba9EoQYScebvnqJx02gDv7PTWrUH3fdpc6h9aYGysK", title: "Agricultural Land", description: "Fertile farming opportunity" },
  { id: 11, url: "https://zhdelzq5lo.ufs.sh/f/5VWIaIba9EoQmX0r27WuP0OcDXb43Vyre1ksvdKBzloJSHZT", title: "Future City Center", description: "Next-generation urban planning" },
  { id: 12, url: "https://zhdelzq5lo.ufs.sh/f/5VWIaIba9EoQ5Wyyurba9EoQMnWcTkJdNxHwRPj0l1vGy3g4", title: "Future City Center", description: "Next-generation urban planning" },
  { id: 13, url: "https://zhdelzq5lo.ufs.sh/f/5VWIaIba9EoQTB6N2KppzMwWGZVjX8Pa3Bi9QfODKyR27emJ", title: "Future City Center", description: "Next-generation urban planning" },
  { id: 14, url: "https://zhdelzq5lo.ufs.sh/f/5VWIaIba9EoQhU1aFzQpBPLtFouM7AlbIXcTdjK4aNhOZUVk", title: "Future City Center", description: "Next-generation urban planning" },
  { id: 15, url: "https://zhdelzq5lo.ufs.sh/f/5VWIaIba9EoQDlyvKASzH36sNMfEr095xaIgC4lwjhmykJPu", title: "Future City Center", description: "Next-generation urban planning" }
];

// Array to dynamically generate form fields
const formFields = [
  { id: 'companyName', label: 'Company Name', icon: Building, placeholder: 'Your official company name', required: true },
  { id: 'companyAddress', label: 'Head Office Business Address', icon: MapPin, placeholder: 'Enter complete address', component: 'textarea', required: true },
  { id: 'contactPerson', label: 'Contact Person', icon: User, placeholder: 'Full name of the contact person', required: true },
  { id: 'contactEmail', label: 'Email Address', icon: MailCheck, placeholder: 'e.g., contact@company.com', type: 'email', required: true },
  { id: 'contactMobile', label: 'Mobile No.', icon: Phone, placeholder: '+63 9XX XXX XXXX', type: 'tel', required: true },
  { id: 'businessType', label: 'Type of Business', icon: Briefcase, placeholder: 'e.g., Manufacturing, IT, Tourism', required: true },
  { id: 'productsServices', label: 'Products / Services', icon: FileText, placeholder: 'What will be produced or offered?', component: 'textarea', required: true },
  { id: 'spaceRequirements', label: 'Space Required', icon: Maximize, placeholder: 'Land area, building, parking, etc.', component: 'textarea', required: true },
  { id: 'needsAndExpectations', label: 'Needs and Expectations in Polomolok / GenSan', icon: FileText, placeholder: 'Describe your expectations for the location', component: 'textarea' }
];


export default function Home() {
  const [inquiryData, setInquiryData] = useState<InvestmentInquiry>({
    companyName: '', companyAddress: '', contactPerson: '', contactLandline: '',
    contactMobile: '', contactEmail: '', businessType: '', productsServices: '',
    projectedEmployees: '', operationsTimeline: '', spaceRequirements: '',
    utilityNeeds: '', needsAndExpectations: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const galleryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setInquiryData(prev => ({ ...prev, [id]: value }));
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Client-side validation to check for empty required fields
    const isFormValid = formFields
        .filter(field => field.required)
        .every(field => inquiryData[field.id as keyof InvestmentInquiry].trim() !== '');

    if (!isFormValid) {
        setError("Please fill in all required fields.");
        return;
    }

    setIsLoading(true);

    // Call the server action
    const result = await createInvestmentInquiry(inquiryData);

    setIsLoading(false);

    if (result.success) {
        setFormSubmitted(true);
        // Scroll to the video section after a short delay
        setTimeout(() => scrollToSection(videoRef), 500);
    } else {
        // Display the error message from the server
        setError(result.message);
    }
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <Header />

      {/* Gallery Section */}
      <section ref={galleryRef} className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 mb-12">
                {propertyImages.map((property) => (
                    <div key={property.id} className="w-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <Image src={property.url} alt={property.title} width={800} height={450} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                ))}
            </div>
            <div className="text-center">
                <Button onClick={() => scrollToSection(formRef)} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full">
                    Inquire Now <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </div>
      </section>
      
      {/* --- Combined Inquiry Form Section --- */}
      <section ref={formRef} className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900">Inquiry Form</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Provide your details below so we can better understand your needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInquirySubmit} className="space-y-8">
                {/* Dynamically render form fields in a grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  {formFields.map(field => {
                    const Component = field.component === 'textarea' ? Textarea : Input;
                    const Icon = field.icon;
                    return (
                      <div key={field.id} className={`space-y-2 ${field.component === 'textarea' ? 'md:col-span-2' : ''}`}>
                        <Label htmlFor={field.id} className="text-sm font-medium flex items-center">
                            <Icon className="h-4 w-4 mr-2 text-gray-500"/>
                            {field.label} {field.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <Component
                          id={field.id}
                          value={inquiryData[field.id as keyof InvestmentInquiry]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          type={field.type || 'text'}
                          required={field.required}
                          className={`h-12 ${field.component === 'textarea' ? 'min-h-[100px]' : ''}`}
                          disabled={formSubmitted || isLoading}
                        />
                      </div>
                    )
                  })}
                </div>

                {/* Display server-side error messages */}
                {error && (
                    <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                )}

                {!formSubmitted ? (
                  <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-lg" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit Inquiry'}
                  </Button>
                ) : (
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-700 font-medium">✓ Thank you! Your inquiry has been submitted successfully.</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Video Section */}
      {formSubmitted && (
        <section ref={videoRef} className="py-20 bg-gradient-to-br from-purple-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Thank You, {inquiryData.contactPerson}!
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Based on your inquiry, here is an exclusive presentation about our properties.
              </p>
            </div>
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-black relative">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Richmond Land Innovations Property Showcase"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
            <div className="mt-8 text-center">
              <Card className="inline-block p-6 shadow-lg border-0">
                <div className="flex items-center space-x-4">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">What&apos;s Next?</h3>
                    <p className="text-gray-600">Our team will contact you at {inquiryData.contactEmail} within 24 hours.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
