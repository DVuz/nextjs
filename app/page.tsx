
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Zap, Shield, Rocket } from 'lucide-react';

export default function ModernLandingPage() {
    const features = [
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Lightning Fast",
            description: "Optimized performance with cutting-edge technology stack"
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Secure by Default",
            description: "Built-in security features to protect your data"
        },
        {
            icon: <Rocket className="h-6 w-6" />,
            title: "Ready to Scale",
            description: "Designed to grow with your business needs"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
            {/* Navigation */}
            <nav className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ModernApp
              </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm">
                                Features
                            </Button>
                            <Button variant="ghost" size="sm">
                                Pricing
                            </Button>
                            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
                        ✨ New Release Available
                    </Badge>

                    <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
                        Build Amazing Apps
                        <br />
                        <span className="text-blue-600 dark:text-blue-400">Faster Than Ever</span>
                    </h1>

                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Create beautiful, responsive applications with our modern tech stack.
                        From concept to deployment in minutes, not hours.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg">
                            Start Building
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-2">
                            View Examples
                        </Button>
                    </div>

                    {/* Alert */}
                    <Alert className="max-w-md mx-auto bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                        <Sparkles className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-700 dark:text-green-300">
                            Join 10,000+ developers building the future of web applications.
                        </AlertDescription>
                    </Alert>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {features.map((feature, index) => (
                        <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm dark:bg-slate-800/60 hover:scale-105">
                            <CardHeader className="text-center pb-4">
                                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <CardDescription className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12 text-white text-center">
                    <h2 className="text-3xl font-bold mb-8">Trusted by Developers Worldwide</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div>
                            <div className="text-4xl font-bold mb-2">10k+</div>
                            <div className="text-blue-100">Active Users</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">99.9%</div>
                            <div className="text-blue-100">Uptime</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">50ms</div>
                            <div className="text-blue-100">Response Time</div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Sparkles className="h-5 w-5 text-white" />
                                </div>
                                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ModernApp
                </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 mb-4 max-w-md">
                                Building the future of web applications with modern tools and technologies.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h3>
                            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Examples</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h3>
                            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                                <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 text-center text-slate-600 dark:text-slate-300">
                        <p>&copy; 2025 ModernApp. Built with Tailwind CSS & shadcn/ui.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}