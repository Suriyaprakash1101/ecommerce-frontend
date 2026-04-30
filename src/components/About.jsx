import React from 'react';
import Header from './Header';
import Footer from './Footer';

const About = () => {
    // Features data for the ecommerce platform
    const features = [
        {
            title: "Curated Collection",
            description: "Hand-picked products that blend quality with style, updated weekly to keep you ahead of trends.",
            icon: "✨"
        },
        {
            title: "Secure Payments",
            description: "Shop with confidence using our encrypted payment gateway supporting all major credit cards.",
            icon: "🔒"
        },
        {
            title: "Fast Shipping",
            description: "Express delivery options and real-time tracking from our warehouses worldwide.",
            icon: "🚚"
        },
        {
            title: "24/7 Support",
            description: "Our dedicated support team is always here to help with any questions or concerns.",
            icon: "💬"
        }
    ];

    // Team/values data
    const values = [
        "Sustainable sourcing practices",
        "Ethical manufacturing standards",
        "Carbon-neutral shipping options",
        "Community-driven product development"
    ];

    return (
        <div>
            <Header/>
            <div
                className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
                style={{ backgroundColor: "#FFFFFF" }}
            >
                <div className="max-w-7xl mx-auto">

                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1
                            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
                            style={{ color: "#1A2A36" }}
                        >
                            About{" "}
                            <span style={{ color: "#49A8B4" }}>Aqua</span>
                        </h1>
                        <div className="w-24 h-1 mx-auto mb-6 rounded-full" style={{ backgroundColor: "#6BD3E0" }}></div>
                        <p
                            className="text-lg max-w-2xl mx-auto"
                            style={{ color: "#5B6F82" }}
                        >
                            Redefining online shopping with a seamless blend of style, innovation,
                            and customer-first approach since 2020.
                        </p>
                    </div>

                    {/* Story Section with Card */}
                    <div
                        className="rounded-2xl p-8 mb-16 shadow-sm"
                        style={{ backgroundColor: "#F2F5FA" }}
                    >
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2
                                    className="text-2xl font-semibold mb-4"
                                    style={{ color: "#1A2A36" }}
                                >
                                    Our Story
                                </h2>
                                <p className="mb-4" style={{ color: "#5B6F82" }}>
                                    Founded with a vision to transform the ecommerce landscape, AquaMart has grown
                                    from a small boutique to a trusted destination for quality products across categories
                                    like fashion, electronics, home decor, and lifestyle essentials.
                                </p>
                                <p style={{ color: "#5B6F82" }}>
                                    We believe shopping should be an experience—not just a transaction. That's why
                                    we've built a platform that prioritizes design, usability, and genuine customer care
                                    at every step.
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <div
                                    className="w-48 h-48 rounded-full flex items-center justify-center text-6xl shadow-lg"
                                    style={{ backgroundColor: "#6BD3E0", color: "#FFFFFF" }}
                                >
                                    🛍️
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <h2
                        className="text-2xl font-semibold text-center mb-8"
                        style={{ color: "#1A2A36" }}
                    >
                        Why Shop With Us?
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-1 shadow-sm"
                                style={{ backgroundColor: "#F2F5FA" }}
                            >
                                <div className="text-3xl mb-3">{feature.icon}</div>
                                <h3
                                    className="font-semibold text-lg mb-2"
                                    style={{ color: "#1A2A36" }}
                                >
                                    {feature.title}
                                </h3>
                                <p
                                    className="text-sm"
                                    style={{ color: "#5B6F82" }}
                                >
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Values Section with Brand Colors */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div
                            className="rounded-2xl p-6 shadow-sm"
                            style={{ backgroundColor: "#F2F5FA" }}
                        >
                            <h3
                                className="text-xl font-semibold mb-4"
                                style={{ color: "#1A2A36" }}
                            >
                                Our Commitment
                            </h3>
                            <ul className="space-y-3">
                                {values.map((value, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <span style={{ color: "#6BD3E0" }}>✓</span>
                                        <span style={{ color: "#5B6F82" }}>{value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div
                            className="rounded-2xl p-6 shadow-sm"
                            style={{ backgroundColor: "#F2F5FA" }}
                        >
                            <h3
                                className="text-xl font-semibold mb-4"
                                style={{ color: "#1A2A36" }}
                            >
                                Customer First
                            </h3>
                            <p className="mb-3" style={{ color: "#5B6F82" }}>
                                Your satisfaction is our priority. From easy returns to dedicated support,
                                we're here to make your experience exceptional.
                            </p>
                            <div className="flex items-center gap-1 mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} style={{ color: "#D4AF37" }}>★</span>
                                ))}
                                <span className="ml-2 text-sm" style={{ color: "#5B6F82" }}>4.8/5 from 10k+ reviews</span>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div
                        className="rounded-2xl p-8 text-center shadow-sm"
                        style={{ backgroundColor: "#3A6B7C" }}
                    >
                        <h2
                            className="text-2xl font-semibold mb-2"
                            style={{ color: "#FFFFFF" }}
                        >
                            Ready to experience the difference?
                        </h2>
                        <p
                            className="mb-6"
                            style={{ color: "#F2F5FA" }}
                        >
                            Join thousands of happy customers shopping with us daily.
                        </p>
                        <button
                            className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 shadow-md"
                            style={{ backgroundColor: "#6BD3E0", color: "#1A2A36" }}
                        >
                            Start Shopping
                        </button>
                    </div>

                </div>
            </div>
         <Footer/>
            
        </div>
    );
};

export default About;