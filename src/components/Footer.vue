<script setup>
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from 'lucide-vue-next';
</script>

<template>
  <footer class="bg-dark text-white pt-20 pb-10">
    <div class="container mx-auto px-4 md:px-6">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
        
        <!-- Company Info -->
        <div class="lg:col-span-4">
          <a href="#" class="flex items-center gap-2 group mb-6 inline-flex">
            <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <span class="font-heading font-bold text-2xl text-white">SkillGro</span>
          </a>
          <p class="text-white/70 mb-6 leading-relaxed max-w-sm">
            Empowering students worldwide with the best online courses and experienced instructors to achieve their learning goals.
          </p>
          <div class="space-y-3 text-white/70">
            <div class="flex items-start gap-3">
              <MapPin class="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>123 Education Lane, Learning City, NY 10001, USA</span>
            </div>
            <div class="flex items-center gap-3">
              <Phone class="w-5 h-5 text-primary shrink-0" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div class="flex items-center gap-3">
              <Mail class="w-5 h-5 text-primary shrink-0" />
              <span>support@skillgro.com</span>
            </div>
          </div>
        </div>
        
        <!-- Links Columns -->
        <div class="lg:col-span-2 lg:col-start-6">
          <h4 class="font-heading font-bold text-lg mb-6">Useful Links</h4>
          <ul class="space-y-3 text-white/70">
            <li><a href="#" class="hover:text-primary transition-colors">Our Courses</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Testimonials</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Our Instructors</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Events</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">FAQ's</a></li>
          </ul>
        </div>
        
        <div class="lg:col-span-2">
          <h4 class="font-heading font-bold text-lg mb-6">Our Company</h4>
          <ul class="space-y-3 text-white/70">
            <li><a href="#" class="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Contact Us</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Become a Teacher</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Blog</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Careers</a></li>
          </ul>
        </div>
        
        <!-- App Store Badges -->
        <div class="lg:col-span-3">
          <h4 class="font-heading font-bold text-lg mb-6">Download App</h4>
          <p class="text-white/70 mb-6">Get our app for the best mobile learning experience anywhere, anytime.</p>
          <div class="flex flex-col gap-3">
            <a href="#" class="bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3 transition-colors max-w-[180px]">
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-white/20">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              </div>
              <div>
                <div class="text-[10px] leading-none text-white/70 mb-0.5">Download on the</div>
                <div class="text-sm font-bold leading-none">App Store</div>
              </div>
            </a>
            
            <a href="#" class="bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3 transition-colors max-w-[180px]">
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-white/20">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 512 512"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
              </div>
              <div>
                <div class="text-[10px] leading-none text-white/70 mb-0.5">GET IT ON</div>
                <div class="text-sm font-bold leading-none">Google Play</div>
              </div>
            </a>
          </div>
        </div>
        
      </div>
      
      <!-- Bottom Bar -->
      <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-white/70 text-sm">
          &copy; 2024 SkillGro. All Rights Reserved.
        </p>
        
        <div class="flex items-center gap-4">
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
            <Facebook class="w-4 h-4" />
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
            <Twitter class="w-4 h-4" />
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
            <Linkedin class="w-4 h-4" />
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
            <Instagram class="w-4 h-4" />
          </a>
        </div>
        
        <div class="flex gap-4 text-sm text-white/70">
          <a href="#" class="hover:text-primary transition-colors">Terms of Use</a>
          <a href="#" class="hover:text-primary transition-colors">Privacy Policy</a>
        </div>
      </div>
      
    </div>
  </footer>
</template>
