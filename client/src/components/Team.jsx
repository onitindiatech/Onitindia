import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'react-feather';
import g1 from "../assets/g1.jpeg"
import g2 from "../assets/g2.jpeg"
import a1 from "../assets/1.jpeg"


// Placeholder data - User to replace with actual data/images
const teamMembers = [
    {
        name: "Campus Activation",
        description: "Engaging with students and building the community across Delhi.",
        image: g2,
    },
    {
        name: "Verified Helpers",
        description: "Our team ensuring every task performer is verified and trusted.",
        image: a1,
    },
    {
        name: "Community Support",
        description: "On-ground support to help users get tasks done smoothly.",
        image: g1,
    },
];

const Team = () => {
    return (
        <section className="py-10 md:py-24 bg-[#f3f4f6] px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-zinc-800 font-['Neue Montreal'] mb-4">
                        Our <span className="text-green-600">Ground Work</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        See our team in action, connecting communities and making things happen on the ground.
                    </p>
                </div>

                {/* Ground Work Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((item, index) => (
                        <motion.div
                            key={index} c
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="group relative overflow-hidden rounded-2xl border-2 border-zinc-400"
                        >
                            {/* Image Container */}
                            <div className="w-full aspect-[4/3] overflow-hidden">
                                <img
                                    src={item.image}
                                    alt="Ground Work"
                                    className="w-full h-full object-cover transform "
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
