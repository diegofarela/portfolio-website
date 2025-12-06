// V3 Enhanced Interactivity Script

// Project data for modals
const projectData = {
    crm: {
        title: "Custom CRM System",
        description: "Built a comprehensive, bespoke CRM system from the ground up to handle the unique needs of the organization. This system manages detailed individual tracking, maintains one-to-one parent associations, and automates communication flows.",
        details: [
            "Individual tracking for every student and parent",
            "Automated email delivery monitoring and subscription management",
            "Real-time status updates and communication tracking",
            "Custom reporting and analytics dashboard"
        ],
        impact: "Result: 100% Data Visibility & Reliability",
        tags: ["Python", "Automation", "Data Management", "CRM"]
    },
    admissions: {
        title: "Admissions Process System",
        description: "Completely revamped the admissions workflow to eliminate manual processes and reduce administrative burden. The system now handles everything from initial application to final enrollment.",
        details: [
            "Automatic contact creation for students and parents",
            "Remote/in-person intent tracking and routing",
            "Recurring applicant detection and status management",
            "Streamlined review process - reviewers only see latest submissions",
            "Personalized communication templates"
        ],
        impact: "Result: Saved 100+ Admin Hours per Cycle",
        tags: ["Process Design", "Email Automation", "Workflow"]
    },
    sync: {
        title: "Bidirectional Database Sync",
        description: "Engineered a real-time synchronization system between the main database and CRM platform. This ensures data integrity, eliminates redundancy, and provides a single source of truth.",
        details: [
            "Real-time bidirectional data synchronization",
            "Conflict resolution and data validation",
            "Secure API integration",
            "Automatic error handling and recovery",
            "Audit trail for all data changes"
        ],
        impact: "Result: Zero Redundancy & Manual Entry",
        tags: ["API Integration", "Real-time", "Data Security"]
    },
    qr: {
        title: "Secure QR Check-in System",
        description: "Developed a mobile-friendly QR code scanning system with whitelist validation for secure event check-ins. Provides instant feedback and prevents unauthorized access.",
        details: [
            "QR code generation and validation",
            "Whitelist-based access control",
            "Real-time validation feedback",
            "Mobile-optimized interface",
            "Event attendance tracking"
        ],
        impact: "Result: Instant Verification & Secure Access",
        tags: ["Mobile", "Security", "QR Technology"]
    },
    cert: {
        title: "Certificate Generation Engine",
        description: "Created a flexible certificate generation system that allows for custom designs and mass distribution. The system went through three iterations to achieve the necessary flexibility.",
        details: [
            "Fully customizable certificate templates",
            "Batch processing for mass distribution",
            "Dynamic data insertion",
            "Multiple format support (PDF, PNG)",
            "Automated email delivery"
        ],
        impact: "Result: Fast Recognition & Consistent Branding",
        tags: ["Design", "Batch Processing", "Automation"]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tooltip functionality for Tech Stack
    const techItems = document.querySelectorAll('.tech-item');
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.background = 'rgba(0,0,0,0.9)';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '8px 12px';
    tooltip.style.borderRadius = '6px';
    tooltip.style.fontSize = '0.75rem';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.2s';
    tooltip.style.zIndex = '1000';
    tooltip.style.whiteSpace = 'nowrap';
    document.body.appendChild(tooltip);

    techItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const tooltipText = item.getAttribute('data-tooltip');
            if (tooltipText) {
                const rect = item.getBoundingClientRect();
                tooltip.textContent = tooltipText;
                tooltip.style.top = `${rect.top - 35 + window.scrollY}px`;
                tooltip.style.left = `${rect.left + (rect.width / 2)}px`;
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.style.opacity = '1';
            }
        });

        item.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });

        // Click to filter
        item.addEventListener('click', () => {
            const tech = item.getAttribute('data-tech');
            if (tech) {
                filterProjects(tech);
                // Update filter buttons
                document.querySelectorAll('.tech-filter').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-filter') === tech) {
                        btn.classList.add('active');
                    }
                });
            }
        });
    });

    // 2. Tech Filter Buttons
    const filterButtons = document.querySelectorAll('.tech-filter');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            filterProjects(filter);
        });
    });

    function filterProjects(filter) {
        const projects = document.querySelectorAll('.clickable-project');
        projects.forEach(project => {
            if (filter === 'all') {
                project.classList.remove('filtered-out');
            } else {
                const projectTech = project.getAttribute('data-tech');
                if (projectTech && projectTech.includes(filter)) {
                    project.classList.remove('filtered-out');
                } else {
                    project.classList.add('filtered-out');
                }
            }
        });
    }

    // 3. Clickable Project Tiles - Open Modal
    const projectTiles = document.querySelectorAll('.clickable-project');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.modal-close');

    projectTiles.forEach(tile => {
        tile.addEventListener('click', (e) => {
            if (!tile.classList.contains('filtered-out')) {
                const projectId = tile.getAttribute('data-project');
                openProjectModal(projectId);
            }
        });
    });

    function openProjectModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <h3 style="margin-top: 20px; margin-bottom: 10px; color: var(--text-white);">Key Features:</h3>
            <ul style="list-style: none; padding: 0;">
                ${project.details.map(detail => `<li style="margin-bottom: 10px; color: var(--text-gray);"><i class="fa-solid fa-check" style="color: var(--green-accent); margin-right: 8px;"></i>${detail}</li>`).join('')}
            </ul>
            <div class="modal-tags">
                ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
            <div class="modal-impact">${project.impact}</div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 4. Animated Stat Counters
    const statCounters = document.querySelectorAll('.clickable-stat');
    statCounters.forEach(stat => {
        stat.addEventListener('click', () => {
            const target = parseInt(stat.getAttribute('data-target'));
            animateCounter(stat.querySelector('.number'), target);
        });
    });

    function animateCounter(element, target) {
        const duration = 1000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target === 100 ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
            }
        }, 16);
    }

    // 5. Staggered Animation on Load
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile, index) => {
        tile.style.opacity = '0';
        tile.style.transform = 'translateY(20px)';
        setTimeout(() => {
            tile.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            tile.style.opacity = '1';
            tile.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // 6. Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
