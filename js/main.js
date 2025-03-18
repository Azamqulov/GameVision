document.addEventListener("DOMContentLoaded", () => {
    // Header scroll effect
    const header = document.querySelector(".header")
    const backToTop = document.getElementById("backToTop")

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            header.classList.add("scrolled")
            backToTop.classList.add("active")
        } else {
            header.classList.remove("scrolled")
            backToTop.classList.remove("active")
        }
    })

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const navList = document.querySelector(".nav-list")

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", function () {
            this.classList.toggle("active")
            navList.classList.toggle("active")
        })
    }

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll(".nav-list a")
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenuBtn.classList.remove("active")
            navList.classList.remove("active")
        })
    })

    // Active nav link on scroll
    const sections = document.querySelectorAll("section[id]")

    function scrollActive() {
        const scrollY = window.pageYOffset

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight
            const sectionTop = current.offsetTop - 100
            const sectionId = current.getAttribute("id")

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(".nav-list a[href*=" + sectionId + "]").classList.add("active")
            } else {
                document.querySelector(".nav-list a[href*=" + sectionId + "]").classList.remove("active")
            }
        })
    }

    window.addEventListener("scroll", scrollActive)

    // Animated Counter
    const counters = document.querySelectorAll(".stat-number")
    const speed = 200

    function animateCounters() {
        counters.forEach((counter) => {
            const target = +counter.dataset.count
            const count = +counter.innerText
            const increment = target / speed

            if (count < target) {
                counter.innerText = Math.ceil(count + increment)
                setTimeout(animateCounters, 1)
            } else {
                counter.innerText = target
            }
        })
    }

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect()
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
    }

    // Start counter animation when stats section is in viewport
    window.addEventListener("scroll", () => {
        const statsSection = document.querySelector(".hero-stats")
        if (statsSection && isInViewport(statsSection)) {
            animateCounters()
        }
    })

    // Tabs functionality
    const tabBtns = document.querySelectorAll(".tab-btn")
    const tabPanes = document.querySelectorAll(".tab-pane")

    tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach((btn) => btn.classList.remove("active"))
            tabPanes.forEach((pane) => pane.classList.remove("active"))

            // Add active class to clicked button
            btn.classList.add("active")

            // Show corresponding tab pane
            const tabId = btn.getAttribute("data-tab")
            document.getElementById(`${tabId}-tab`).classList.add("active")
        })
    })

    // Video Play Button
    const playButton = document.querySelector(".play-button")
    const vrVideo = document.querySelector(".vr-video img")

    if (playButton && vrVideo) {
        playButton.addEventListener("click", () => {
            // In a real implementation, this would play a video
            // For this demo, we'll just change the image
            vrVideo.style.filter = "brightness(0.7)"
            playButton.innerHTML = '<i class="fas fa-pause"></i>'

            // Simulate video playing
            setTimeout(() => {
                playButton.innerHTML = '<i class="fas fa-play"></i>'
                vrVideo.style.filter = "brightness(1)"
            }, 3000)
        })
    }

    // Contact Form Submission
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault()

            // Simple form validation
            const name = this.querySelector('input[name="name"]').value
            const email = this.querySelector('input[name="email"]').value
            const message = this.querySelector('textarea[name="message"]').value

            if (!name || !email || !message) {
                alert("Per favore, compila tutti i campi obbligatori")
                return
            }

            // Show success message
            const formGroups = this.querySelectorAll(".form-group")
            const submitBtn = this.querySelector('button[type="submit"]')

            formGroups.forEach((group) => {
                group.style.opacity = "0"
                group.style.transform = "translateY(-20px)"
                group.style.transition = "all 0.3s ease"
            })

            submitBtn.style.opacity = "0"
            submitBtn.style.transform = "translateY(-20px)"
            submitBtn.style.transition = "all 0.3s ease"

            setTimeout(() => {
                const successMessage = document.createElement("div")
                successMessage.className = "success-message"
                successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Grazie!</h3>
            <p>Il tuo messaggio è stato inviato con successo. Ti risponderemo presto!</p>
          `
                successMessage.style.textAlign = "center"
                successMessage.style.color = "var(--light-text)"

                this.innerHTML = ""
                this.appendChild(successMessage)

                // Reset form after 5 seconds
                setTimeout(() => {
                    window.location.reload()
                }, 5000)
            }, 300)
        })
    }

    // Newsletter Form Submission
    const newsletterForms = document.querySelectorAll(".newsletter-form")
    if (newsletterForms.length > 0) {
        newsletterForms.forEach((form) => {
            form.addEventListener("submit", function (e) {
                e.preventDefault()

                const emailInput = this.querySelector('input[type="email"]')
                const email = emailInput.value

                if (!email) {
                    alert("Per favore, inserisci il tuo indirizzo email")
                    return
                }

                // Simulate form submission
                emailInput.value = ""

                // Show success message
                const successMessage = document.createElement("p")
                successMessage.className = "newsletter-success"
                successMessage.textContent = "Grazie per l'iscrizione!"
                successMessage.style.color = "var(--secondary-color)"
                successMessage.style.marginTop = "10px"

                // Remove any existing success message
                const existingMessage = this.querySelector(".newsletter-success")
                if (existingMessage) {
                    existingMessage.remove()
                }

                this.appendChild(successMessage)
            })
        })
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
            if (targetId === "#") return

            const targetElement = document.querySelector(targetId)
            if (targetElement) {
                // Get header height for offset
                const headerHeight = document.querySelector(".header").offsetHeight

                // Calculate position with smooth easing
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
                const startPosition = window.pageYOffset
                const distance = targetPosition - startPosition
                const startTime = null

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime
                    const timeElapsed = currentTime - startTime
                    const startTime = currentTime
                    const timeElapsed = currentTime - startTime
                    const duration = 1000 // Animation duration in ms

                    // Easing function (easeOutQuad)
                    const run = easeOutQuad(timeElapsed, startPosition, distance, duration)
                    window.scrollTo(0, run)

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation)
                    }
                }

                // Easing function
                function easeOutQuad(t, b, c, d) {
                    t /= d
                    return -c * t * (t - 2) + b
                }

                requestAnimationFrame(animation)
            }
        })
    })

    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(
            ".section-header, .trend-card, .ai-image, .ai-text, .vr-video, .vr-info, .challenge-card, .future-item, .contact-info, .contact-form, .event-card",
        )

        elements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect().top
            const windowHeight = window.innerHeight

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = "1"
                element.style.transform = "translateY(0)"
            }
        })
    }

    // Run on load and scroll
    animateOnScroll()
    window.addEventListener("scroll", animateOnScroll)
})

