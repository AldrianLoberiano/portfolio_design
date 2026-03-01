import { useState } from "react";
import { motion } from "motion/react";
import {
  Send,
  Mail,
  MapPin,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { submitContact, type ApiError } from "../lib/api";
import { useMutation } from "../hooks/useApi";

// ── Simple math CAPTCHA ────────────────────────────────
function generateCaptcha() {
  const ops = ["+", "-", "×"] as const;
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a = Math.floor(Math.random() * 9) + 1;
  let b = Math.floor(Math.random() * 9) + 1;
  if (op === "-") { a = Math.max(a, b) + 2; b = Math.min(a - 2, b); }
  const answer = op === "+" ? a + b : op === "-" ? a - b : a * b;
  return { question: `${a} ${op} ${b}`, answer };
}

const socialLinks = [
  { name: "Facebook", url: "https://www.facebook.com/its.adinggg" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/aldriancayoloberiano/" },
  { name: "GitHub", url: "https://github.com/AldrianLoberiano" },
];

const services = [
  "Product Design",
  "Brand Identity",
  "Web Development",
  "Creative Direction",
  "Design System",
  "Consulting",
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    service: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);

  const { mutate: sendMessage, isLoading: isSending, error: submitError } = useMutation(
    (data: typeof formData) => submitContact(data)
  );

  // Client-side validation
  const validate = (): string[] => {
    const errors: string[] = [];
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.push("Name must be at least 2 characters");
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.push("Message must be at least 10 characters");
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);

    // Client-side validation first
    const errors = validate();
    if (errors.length > 0) {
      setValidationErrors(errors);
      toast.error(errors[0]);
      return;
    }

    // CAPTCHA check
    if (parseInt(captchaInput, 10) !== captcha.answer) {
      setCaptchaError(true);
      toast.error("Incorrect security answer. Please try the new question.");
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      return;
    }
    setCaptchaError(false);

    try {
      await sendMessage(formData);
      setIsSubmitted(true);
      toast.success("Message sent! I'll get back to you within 24 hours.");
    } catch (err: any) {
      // Show server validation errors if available
      if (err.body?.errors) {
        setValidationErrors(err.body.errors);
        toast.error(err.body.errors[0]);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
      console.error("Contact form submission error:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear field-specific errors on change
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setValidationErrors([]);
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
    setCaptchaError(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      budget: "",
      service: "",
      message: "",
    });
  };

  return (
    <div className="pt-32 pb-24 lg:pb-32">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p
            className="text-white/40 uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
          >
            Get in Touch
          </p>
          <h1
            className="text-white tracking-[-0.03em]"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            Let's build something
            <br />
            <span className="text-white/30">extraordinary</span>
          </h1>
          <p
            className="mt-6 text-white/40"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1.0625rem", lineHeight: 1.7 }}
          >
            I'm always interested in hearing about new projects. Whether you
            have a detailed brief or just a rough idea, let's start a
            conversation.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 rounded-2xl border border-white/10 bg-white/[0.02] text-center"
              >
                <CheckCircle size={48} className="text-emerald-400 mx-auto mb-6" />
                <h3
                  className="text-white"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.5rem", fontWeight: 600 }}
                >
                  Message Sent
                </h3>
                <p
                  className="mt-3 text-white/40"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}
                >
                  Thanks for reaching out, {formData.name || "friend"}! I'll review your
                  message and get back to you within 24 hours.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-8 px-6 py-3 border border-white/15 text-white rounded-full hover:bg-white/5 transition-all duration-300"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl border border-red-500/20 bg-red-500/5"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        {validationErrors.map((error, i) => (
                          <p
                            key={i}
                            className="text-red-400/80"
                            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
                          >
                            {error}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white/40 mb-2"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 focus:bg-white/[0.05] transition-all duration-300"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white/40 mb-2"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 focus:bg-white/[0.05] transition-all duration-300"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-white/40 mb-2"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Inc."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 focus:bg-white/[0.05] transition-all duration-300"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-white/40 mb-2"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
                    >
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/25 focus:bg-white/[0.05] transition-all duration-300 appearance-none"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
                    >
                      <option value="" className="bg-[#1a1a1a]">Select budget</option>
                      <option value="10k-25k" className="bg-[#1a1a1a]">₱10k - ₱25k</option>
                      <option value="25k-50k" className="bg-[#1a1a1a]">₱25k - ₱50k</option>
                      <option value="50k-100k" className="bg-[#1a1a1a]">₱50k - ₱100k</option>
                      <option value="100k+" className="bg-[#1a1a1a]">₱100k+</option>
                    </select>
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label
                    className="block text-white/40 mb-3"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
                  >
                    What do you need?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            service: prev.service === service ? "" : service,
                          }))
                        }
                        className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                          formData.service === service
                            ? "bg-white text-[#0a0a0a] border-white"
                            : "bg-transparent text-white/40 border-white/10 hover:border-white/20 hover:text-white/60"
                        }`}
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-white/40 mb-2"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
                  >
                    Tell me about your project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, goals, and timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 focus:bg-white/[0.05] transition-all duration-300 resize-none"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", lineHeight: 1.7 }}
                  />
                </div>

                {/* CAPTCHA */}
                <div>
                  <label
                    className="block text-white/40 mb-2"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 400 }}
                  >
                    Security Check *
                  </label>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div
                      className="px-5 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white select-none"
                      style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.125rem", fontWeight: 600, letterSpacing: "0.05em" }}
                    >
                      {captcha.question} = ?
                    </div>
                    <input
                      type="number"
                      value={captchaInput}
                      onChange={(e) => { setCaptchaInput(e.target.value); setCaptchaError(false); }}
                      placeholder="Answer"
                      className={`w-28 px-4 py-3 rounded-xl border text-white bg-white/[0.03] placeholder:text-white/20 focus:outline-none transition-all duration-300 ${
                        captchaError
                          ? "border-red-500/50 bg-red-500/5 focus:border-red-500/60"
                          : "border-white/10 focus:border-white/25 focus:bg-white/[0.05]"
                      }`}
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
                    />
                    <button
                      type="button"
                      onClick={() => { setCaptcha(generateCaptcha()); setCaptchaInput(""); setCaptchaError(false); }}
                      className="p-2.5 rounded-lg border border-white/10 text-white/30 hover:text-white/60 hover:border-white/20 transition-all duration-300"
                      title="New question"
                    >
                      <RefreshCw size={14} />
                    </button>
                  </div>
                  {captchaError && (
                    <p className="mt-1.5 text-red-400/80" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}>
                      Incorrect answer — a new question has been generated.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#0a0a0a] rounded-full transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", fontWeight: 500 }}
                >
                  {isSending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send
                        size={16}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                      />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 space-y-10"
          >
            {/* Direct Contact */}
            <div className="p-7 rounded-2xl border border-white/5 bg-white/[0.02]">
              <h3
                className="text-white/30 uppercase tracking-[0.15em] mb-6"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
              >
                Direct Contact
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:loberianorian@gmail.com"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}>
                      loberianorian@gmail.com
                    </p>
                    <p
                      className="text-white/30"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
                    >
                      Email
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-white/60">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}>
                      Calauan, Laguna, Philippines
                    </p>
                    <p
                      className="text-white/30"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
                    >
                      Location
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="p-7 rounded-2xl border border-white/5 bg-white/[0.02]">
              <h3
                className="text-white/30 uppercase tracking-[0.15em] mb-6"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
              >
                Social
              </h3>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="flex items-center justify-between py-2 text-white/50 hover:text-white transition-colors duration-300 group"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="p-7 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span
                  className="text-emerald-400"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 500 }}
                >
                  Available for projects
                </span>
              </div>
              <p
                className="text-white/40"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.7 }}
              >
                I'm currently accepting new projects starting March 2026. Typical
                turnaround is 2-6 months depending on scope.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
