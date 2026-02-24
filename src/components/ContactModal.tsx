import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, BadgeCheck, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import type { Listing } from '@/data/listings';

interface ContactModalProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ listing, isOpen, onClose }: ContactModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!listing) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate sending message
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message sent successfully!', {
      description: `${listing.broker.name} will respond shortly.`,
    });

    setIsSending(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[10%] sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg sm:w-full bg-card rounded-2xl shadow-card-hover z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-6 pb-4 border-b border-border">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 border-2 border-primary/20">
                  <AvatarImage src={listing.broker.photo} alt={listing.broker.name} />
                  <AvatarFallback>{listing.broker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{listing.broker.name}</h3>
                    {listing.broker.verified && (
                      <BadgeCheck className="w-5 h-5 text-verified" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {listing.broker.listings} listings • ★ {listing.broker.rating} rating
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">{listing.title}</p>
                <p className="text-xs text-muted-foreground">{listing.location}</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-muted border-0"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-muted border-0"
                  />
                </div>
              </div>

              <Textarea
                placeholder={`Hi ${listing.broker.name.split(' ')[0]}, I'm interested in ${listing.title}...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="bg-muted border-0 resize-none"
              />

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSending}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-button"
                >
                  {isSending ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        ⏳
                      </motion.span>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </div>

              {/* Quick Contact Options */}
              {listing.phone && (
                <div className="flex items-center justify-center gap-4 pt-2">
                  <a
                    href={`tel:${listing.phone}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                  <span className="text-border">|</span>
                  <a
                    href={`https://wa.me/${listing.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              )}
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
