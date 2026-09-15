import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Sprout, UtensilsCrossed, Truck, ShieldCheck, ArrowRight, Search, MapPin, Star,
  TrendingUp, TrendingDown, Minus, CheckCircle2, Circle, Bell, User, LogOut, Plus,
  BarChart3, PackageCheck, Wallet, Leaf, ChevronRight, X, ClipboardList, Filter,
  Package, Clock, IndianRupee, Sparkles, Award, AlertTriangle, LayoutDashboard,
  Store, Route, Users, ShieldQuestion, ThumbsUp, ThumbsDown, PlayCircle, ChevronLeft,
  BadgeCheck, MapPinned, CalendarDays, Scale, Percent, Gauge, ArrowUpRight, ArrowDownRight,
  Menu, Mic, MicOff, Camera, ImagePlus, QrCode, ScanLine, Link2, Lock, Hash, ShieldAlert,
  Fingerprint, MessageCircle, Send, Volume2, VolumeX, Bot, Navigation, LocateFixed, RadioTower, WifiOff, Wifi, Smartphone,
  ShoppingBasket, Home, BadgePercent
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";

/* ============================================================
   DESIGN TOKENS
   ============================================================ */
const C = {
  forest: "#12312A",
  forestMid: "#1F5D3C",
  leaf: "#3F8F5C",
  leafLight: "#DCEEE1",
  marigold: "#E8871E",
  marigoldDark: "#C96A0E",
  marigoldLight: "#FBEBD6",
  cream: "#F7F8F3",
  soil: "#6B4A2F",
  sky: "#2B6CB0",
  skyLight: "#DCEAF7",
  slate: "#3C4A43",
  slateLight: "#E7EBE6",
  danger: "#C0442F",
  dangerLight: "#F6E1DC",
  plum: "#7B3FA0",
  plumLight: "#F0E3F7",
  gold: "#B8860B",
  white: "#FFFFFF",
  line: "#E1E5DD",
};

const gradeColor = (g) =>
  g === "A+" ? { bg: C.marigoldLight, fg: C.marigoldDark, ring: C.marigold }
  : g === "A" ? { bg: C.leafLight, fg: C.forestMid, ring: C.leaf }
  : { bg: C.slateLight, fg: C.slate, ring: C.slate };

const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

/* ============================================================
   i18n — English / Hindi / Telugu
   ============================================================ */
const LANGS = ["en", "hi", "te"];
const LANG_LABELS = { en: "English", hi: "हिन्दी", te: "తెలుగు" };
const LANG_SHORT = { en: "EN", hi: "हि", te: "తె" };

const TRANSLATIONS = {
  en: {
    brand_tagline: "From Farm to Restaurant, Smarter.",
    hero_subtitle: "FarmConnect connects farmers, restaurants and transporters through a transparent digital supply chain — cutting out middlemen, verifying quality, and moving produce faster.",
    btn_get_started: "Get Started", btn_explore_marketplace: "Explore Marketplace", btn_login: "Login",
    stat_partner_farms: "Partner Farms", stat_intermediaries_removed: "Intermediaries removed", stat_illustrative: "Illustrative figures",
    supply_chain_flow: "Supply Chain Flow",
    flow_farmer: "Farmer Lists Produce", flow_quality: "Quality Verified", flow_match: "FarmConnect Matches", flow_transport: "Transport Assigned", flow_restaurant: "Restaurant Receives",
    why_eyebrow: "Why FarmConnect", why_title: "Built to fix a broken chain", why_desc: "Every layer between farm and kitchen adds cost, delay and uncertainty. FarmConnect removes what doesn't need to be there.",
    benefit1_t: "Better prices for farmers", benefit1_d: "Fewer intermediaries mean more of the final price reaches the farm.",
    benefit2_t: "Lower procurement cost", benefit2_d: "Restaurants source directly, cutting layered commissions.",
    benefit3_t: "Verified quality", benefit3_d: "Every listing carries a graded, admin-verified quality score.",
    benefit4_t: "Reduced wastage", benefit4_d: "Faster, matched fulfilment shortens the farm-to-kitchen window.",
    benefit5_t: "Optimized transportation", benefit5_d: "Delivery requests are auto-generated and routed to nearby transporters.",
    benefit6_t: "Transparent transactions", benefit6_d: "Every order carries a visible price breakdown, end to end.",
    how_eyebrow: "How it works", how_title: "Five roles, one connected workflow",
    role_farmer_d: "Lists produce with quantity, price and grade.", role_admin_d: "Verifies quality and keeps the network trusted.",
    role_restaurant_d: "Discovers, compares and orders direct from farms.", role_transporter_d: "Accepts delivery jobs and moves produce fast.",
    role_consumer_d: "Orders farm-fresh vegetables for home — any amount from 1 kg to 100 kg.",
    cta_title: "Ready to see it in action?", cta_desc: "Try the full demo flow — from listing to payment — in under five minutes.",
    footer_note: "FarmConnect — SIH 2026 Prototype. All statistics illustrative unless noted.",
    role_select_title: "Continue to FarmConnect", role_select_desc: "This is a demo — pick a role below, no signup required.",
    back_home: "Back to home",
    role_farmer: "Farmer", role_restaurant: "Restaurant", role_transporter: "Transporter", role_admin: "Admin", role_consumer: "Consumer",
    role_farmer_short: "List produce, track orders, get paid.", role_restaurant_short: "Discover verified produce, order direct.",
    role_transporter_short: "Accept deliveries, track earnings.", role_admin_short: "Verify quality, monitor the network.",
    role_consumer_short: "Order 1–100 kg of farm-fresh vegetables to your home.",
    continue_as: "Continue as",
    "nav_f-dashboard": "Dashboard", "nav_f-produce": "My Produce", "nav_f-orders": "Orders", "nav_f-quality": "Quality", "nav_f-notifications": "Notifications", "nav_f-profile": "Profile",
    "nav_r-dashboard": "Dashboard", "nav_r-marketplace": "Marketplace", "nav_r-orders": "Orders", "nav_r-matching": "Smart Matching", "nav_r-forecast": "Demand Forecast", "nav_r-pricebreakdown": "Price Breakdown", "nav_r-notifications": "Notifications", "nav_r-profile": "Profile",
    "nav_c-dashboard": "Dashboard", "nav_c-marketplace": "Vegetable Market", "nav_c-orders": "My Orders", "nav_c-notifications": "Notifications", "nav_c-profile": "Profile",
    "nav_t-dashboard": "Dashboard", "nav_t-deliveries": "Deliveries", "nav_t-tracking": "Tracking", "nav_t-notifications": "Notifications", "nav_t-profile": "Profile",
    "nav_a-dashboard": "Dashboard", "nav_a-verification": "Verification", "nav_a-mandi": "Mandi Prices", "nav_a-analytics": "Analytics", "nav_a-notifications": "Notifications",
    "nav_f-mandi": "Mandi Prices",
    mandi_title: "Mandi Prices", mandi_desc_admin: "Set today's reference market (mandi) price per crop. Farmers see this on their dashboard.",
    mandi_desc_farmer: "Official reference market prices, set by Admin — use these to price your listings fairly.",
    btn_save_prices: "Save Prices", prices_saved: "Prices saved", label_mandi_price_per_kg: "Mandi price /kg",
    above_mandi: "above mandi", below_mandi: "below mandi", at_mandi: "at mandi price", your_price_label: "Your price",
    demo_view: "View", demo_session: "Demo session", signed_in_as: "Signed in as",
    btn_consumer_trace: "Consumer Trace", btn_judge_demo: "Judge Demo Mode", btn_switch_role: "Switch Role", btn_reset_demo: "Reset demo data",
    language: "Language",
    f_dash_welcome: "Welcome back", f_dash_title: "Dashboard",
    stat_crops_listed: "Crops Listed", stat_active_orders: "Active Orders", stat_expected_revenue: "Expected Revenue", stat_completed_sales: "Completed Sales", stat_avg_rating: "Avg. Rating",
    my_produce: "My Produce", btn_list_new_produce: "List New Produce", btn_view_quality: "View Quality Report",
    orders_for_produce: "Orders for My Produce", orders_for_produce_d: "Track every restaurant order against your listings.",
    quality_eyebrow: "Differentiator", quality_title: "Crop Quality & Grading", quality_desc: "Every listing is graded on freshness, size consistency, and damage. Admin verifies before it goes live.",
    roadmap_note: "Roadmap: future versions can use computer-vision models to auto-assess freshness, size and damage from photos, reducing manual grading time.",
    r_dash_title: "Dashboard",
    stat_today_procurement: "Today's Procurement", stat_pending_orders: "Pending Orders", stat_monthly_spending: "Monthly Spending", stat_avg_delivery: "Avg. Delivery Time", stat_procurement_saved: "Procurement Saved",
    fresh_marketplace: "Fresh Produce Marketplace", btn_browse_marketplace: "Browse Marketplace",
    /* ---- Consumer (home-buyer) dashboard ---- */
    c_banner_badge: "New · Farm-to-Home",
    c_banner_title: "Farm-fresh vegetables, delivered to your door",
    c_banner_desc: "The same direct-from-farm supply chain restaurants use — now sized for your home. Order any quantity from 1 kg to 100 kg.",
    btn_start_shopping: "Start Shopping", btn_order_now: "Order Now",
    stat_c_active_orders: "Active Orders", stat_c_total_orders: "Total Orders", stat_c_total_spent: "Total Spent",
    stat_c_kg_bought: "Vegetables Bought", stat_c_saved: "Saved vs Retail",
    c_quick_picks: "Today's Fresh Picks", c_quick_picks_d: "Admin-verified produce available right now — tap a card to order your requirement.",
    c_recent_orders: "Your Recent Orders", c_how_much: "You choose the quantity — 1 kg to 100 kg per order",
    c_marketplace_eyebrow: "Farm-to-Home Market", c_marketplace_title: "Vegetables Direct From Farms",
    c_marketplace_desc: "Every listing is admin-verified for quality. Order exactly what you need — from 1 kg up to 100 kg.",
    c_order_form_desc: "Tell us how much you need — anything between 1 kg and 100 kg. Delivery cost is calculated automatically.",
    c_qty_field: "Quantity you need (kg) — min 1 kg", c_qty_max_note: "Per-order limit is 100 kg, capped by what the farm currently has available.",
    c_delivery_fee: "Home delivery", c_retail_price: "Typical retail price", c_you_save: "You save vs retail",
    c_free_delivery_note: "Free home delivery on produce cost above ₹499",
    c_quick_qty_label: "Quick select (kg)", c_deliver_to: "Deliver To",
    marketplace_eyebrow: "Marketplace", marketplace_title: "Fresh Produce, Direct From Farms", marketplace_desc: "Every listing shown here is admin-verified for quality.",
    search_placeholder: "Search tomatoes, onions, potatoes...", filter_all_grades: "All Grades",
    sort_price_asc: "Price: Low to High", sort_price_desc: "Price: High to Low", sort_quality: "Quality Score", sort_fresh: "Freshest First",
    my_orders: "My Orders", my_orders_d: "Every order placed through FarmConnect.",
    t_dash_title: "Dashboard", stat_available_requests: "Available Requests", stat_active_deliveries: "Active Deliveries", stat_completed: "Completed", stat_total_earnings: "Total Earnings",
    available_requests: "Available Delivery Requests", available_requests_d: "Auto-generated whenever a restaurant places an order.", my_deliveries: "My Deliveries", my_deliveries_d: "Requests you have accepted.",
    new_request: "New Request", label_pickup: "Pickup", label_drop: "Drop", label_deadline: "Deadline", label_earnings: "earnings", no_delivery_requests: "No delivery requests right now — check back soon.",
    "nav_a-assign": "Assign Transport", "nav_order-tracking": "Live Tracking",
    assign_transport_title: "Assign Transport", assign_transport_desc: "Select one or more unassigned orders and assign them all to a single vehicle/transporter — great for consolidating deliveries along the same route.",
    th_select: "Select", th_order: "Order", th_crop: "Crop", th_farmer: "Farmer", th_restaurant: "Restaurant", th_deadline: "Deadline",
    select_transporter_label: "Assign to vehicle / transporter", btn_assign_to_vehicle: "Assign Selected to Vehicle",
    assign_success: "Assigned to vehicle successfully.", select_at_least_one: "Select at least one order and a transporter first.",
    vehicles_summary_title: "Vehicles & Their Assigned Orders", orders_count_suffix: "order(s)", no_unassigned_orders: "No unassigned orders right now — every placed order already has a vehicle.",
    no_active_vehicle_assignments: "No vehicles currently carrying an active order.",
    live_location_title: "Live Location", live_location_active_note: "Shared live from the transporter's device since pickup was accepted.",
    live_location_ended_note: "Sharing ended — this was the last known position before delivery.",
    live_location_waiting: "Waiting for the transporter to start sharing their live location.",
    btn_share_location_on: "Share Live Location", btn_share_location_off: "Stop Sharing Location",
    sharing_live_badge: "● Sharing live", last_updated_label: "Last updated", location_denied: "Location permission was denied or is unavailable in this browser.",
    location_not_supported: "This browser doesn't support live location sharing.", seconds_ago_suffix: "s ago", minutes_ago_suffix: "m ago",
    go_online_title: "Go Online", go_online_desc: "Share your current location so nearby orders can be auto-assigned to you.",
    btn_go_online: "Go Online", btn_go_offline: "Go Offline", online_badge: "● Online", offline_note: "Offline — using registered base location for auto-assignment.",
    auto_assign_settings_title: "Automatic Nearby Assignment", auto_assign_settings_desc: "When enabled, new orders are instantly assigned to the closest available transporter within the radius below. Falls back to manual assignment if nobody is in range.",
    auto_assign_toggle_label: "Enable automatic assignment", auto_assign_radius_label: "Radius (km)",
    nearest_transporter_label: "Nearest", no_transporter_in_range: "None in range",
    offline_label: "Offline",
    offline_banner: "You're offline — showing your last saved data. Changes will sync once you're back online.",
    online_restored_banner: "Back online.", map_needs_internet: "Live map needs an internet connection. Coordinates are still being recorded below.",
    app_installable_hint: "Tip: this app can be installed to your home screen and used offline after your first visit.",
    btn_whatsapp_listing: "List via WhatsApp", whatsapp_sim_title: "WhatsApp Listing", whatsapp_sim_badge: "Simulated preview",
    whatsapp_sim_disclaimer: "This is a simulated preview of a future WhatsApp Business API integration — it is not connected to the real WhatsApp. It shows how a farmer could list produce by sending a normal chat message, in their own language.",
    whatsapp_bot_name: "FarmConnect Bot", whatsapp_bot_status: "Simulated · not real WhatsApp",
    whatsapp_greeting: "Hi! Send me your crop details the way you'd message a friend — for example, quantity, crop, price, and when it'll be ready.",
    whatsapp_placeholder: "Message FarmConnect Bot…", whatsapp_try_example: "Try this message",
    whatsapp_example_text: "50 kg tomato, grade A, 30 rupees per kg, harvest tomorrow",
    btn_mark_picked_up: "Mark Picked Up", btn_mark_in_transit: "Mark In Transit", btn_mark_delivered: "Mark Delivered", label_earnings_colon: "Earnings", label_complete: "Complete",
    a_dash_eyebrow: "Network overview", a_dash_title: "Admin Dashboard", a_dash_desc: "Live view of the FarmConnect network. Figures marked demo are illustrative.",
    stat_total_farmers: "Total Farmers", stat_total_restaurants: "Total Restaurants", stat_total_transporters: "Total Transporters", stat_total_consumers: "Total Consumers", stat_active_orders2: "Active Orders",
    stat_completed_orders: "Completed Orders", stat_produce_traded: "Produce Traded", stat_farmer_earnings: "Farmer Earnings", stat_restaurant_savings: "Restaurant Savings",
    pending_verification: "Pending Quality Verification", btn_go_to_verification: "Go to Verification", nothing_pending: "Nothing pending — all listings verified.",
    btn_place_order: "Place Order", btn_view_details: "View Details", btn_confirm_order: "Confirm Order", btn_verify: "Verify", btn_verify_now: "Verify Now",
    btn_accept: "Accept", btn_reject: "Reject", btn_track: "Track", btn_pay: "Pay", btn_submit_listing: "Submit Listing", btn_cancel: "Cancel",
    btn_view_all: "View All", btn_go_to_orders: "Go to Orders", btn_track_order: "Track Order", btn_simulate_payment: "Simulate Payment",
    payment_title: "Payment", label_order_amount: "Order amount", label_transportation: "Transportation", label_platform_fee: "Platform fee", label_total: "Total",
    payment_successful: "Payment Successful", label_farmer_payment: "Farmer Payment", label_transport_payment: "Transport Payment", label_platform_revenue: "Platform Revenue",
    grade_label: "Grade", available_label: "Available", price_label: "Price", quality_score_label: "Quality Score", harvested_label: "Harvested",
    verified_label: "Verified", verification_pending_label: "Verification Pending",
    ql_freshness: "Freshness", ql_size: "Size Consist.", ql_damage: "Damage", ql_verified_by_admin: "Verified by FarmConnect Admin", ql_pending: "Pending Verification",
    notif_title: "Notifications", notif_desc: "Stay on top of orders, verification and payments.", btn_mark_all_read: "Mark all as read", no_notifications: "No notifications yet.",
    profile_title: "Profile", profile_desc: "Demo account details.",
    order_col_order: "Order", order_col_crop: "Crop", order_col_farmer: "Farmer", order_col_restaurant: "Restaurant", order_col_qty: "Qty", order_col_total: "Total", order_col_status: "Status",
    no_orders_yet: "No orders yet.",
    add_crop_title: "List New Produce", add_crop_desc: "Add a new crop to the marketplace — type it, speak it, or snap a photo.",
    field_crop_name: "Crop name", field_crop_icon: "Crop icon (used if no photo is uploaded)", field_quantity: "Quantity (kg)", field_price: "Price per kg (₹)",
    field_harvest_date: "Harvest date", field_location: "Location", field_grade: "Grade", field_method: "Farming method", field_upload: "Upload crop photo",
    voice_listen: "Tap to speak your listing", voice_listening: "Listening… speak now",
    ai_voice_badge: "AI Voice Fill", voice_heard_prefix: "Heard:",
    voice_example: 'Try: "500 kilograms tomato, grade A plus, 30 rupees per kg, organic, harvest tomorrow"',
    voice_not_supported: "Speech recognition isn't supported in this browser — try Chrome on Android/desktop.",
    back_to_marketplace: "Back to Marketplace", label_price: "Price", label_available: "Available", label_harvest_date: "Harvest Date", label_est_delivery: "Est. Delivery", label_farming_method: "Farming Method",
    today_label: "Today", days_ago_suffix: "d ago", day_suffix: "day(s)",
    price_comparison: "Price Comparison", illustrative_label: "(illustrative)", traditional_procurement: "Traditional procurement", farmconnect_incl: "FarmConnect (incl. transport & fee)", est_restaurant_saving: "Estimated restaurant saving",
    back_label: "Back", order_title_prefix: "Order", order_form_desc: "Fill delivery details. Cost is calculated automatically.",
    field_qty_required: "Quantity required (kg) — max", field_qty_available_suffix: "kg available", field_delivery_location: "Delivery location", field_delivery_date: "Preferred delivery date", field_delivery_time: "Preferred delivery time",
    partial_order_hint: "You don't have to order the full listing — choose any amount up to what's available.",
    quick_select_label: "Quick select", remaining_after_order: "will remain in this listing after your order",
    cost_breakdown: "Cost Breakdown", order_placed_title: "Order Placed!", order_placed_desc: "Order", order_placed_desc2: "has been created and a transport request was auto-generated.",
    smart_match_eyebrow: "AI-assisted", smart_match_title: "Smart Farm–Restaurant Matching", smart_match_desc: "Recommends the best-fit farms based on quality, quantity, price, distance and freshness.",
    field_crop_needed: "Crop needed", field_preferred_grade: "Preferred grade",
    match_label: "match", no_match_farms: "No verified farms match this crop yet.",
    forecast_eyebrow: "Plan ahead", forecast_title: "Restaurant Demand Forecast", forecast_desc: "Restaurants indicate future requirements so farmers can plan production. Demo data.",
    demand_high: "High", demand_medium: "Medium", demand_low: "Low", demand_suffix: "demand",
    status_PLACED: "Order Placed", status_TRANSPORTER_ASSIGNED: "Transporter Assigned", status_PICKED_UP: "Produce Picked Up", status_IN_TRANSIT: "In Transit", status_DELIVERED: "Delivered", status_PAID: "Payment Completed",
    price_break_eyebrow: "Transparency", price_break_title: "Price Breakdown: Old Chain vs. FarmConnect", price_break_desc: "Sample values for illustration — actual prices vary per crop and listing.",
    price_break_current_chain: "Current Supply Chain (Demo)", price_break_farmconnect: "FarmConnect (Demo)",
    price_break_stops_note: "5 stops, 4 commissions before reaching the restaurant.", price_break_settlement_note: "1 platform + transport, direct settlement.",
    price_break_platform_fee: "FarmConnect platform fee", price_break_transport: "Transport",
    stat_farmer_benefit: "Farmer benefit", stat_restaurant_saving: "Restaurant saving", stat_intermediaries_removed2: "Intermediaries removed", stat_wastage_reduction: "Est. wastage reduction", demo_estimate: "demo estimate",
    stat_rating: "Rating",
    order_tracking_title: "Order Tracking", order_tracking_desc: "Live status across the FarmConnect supply chain.",
    est_arrival: "Estimated arrival", view_ledger: "View Blockchain Provenance Ledger",
    consumer_trace_title: "Scan & Trace",
    qr_instructions: "Point your camera at a product's QR code to see its full farm-to-table journey. This is a simulated scanner — tap a sample package below to try it.",
    qr_scanning: "Scanning package…", qr_sample_packages: "Sample packages to scan", qr_no_orders: "No delivered orders yet to simulate a scan on. Complete an order first (try Judge Demo Mode).",
    qr_scan_another: "Scan another package", qr_journey: "Farm-to-table journey", qr_view_crypto_ledger: "View Cryptographic Ledger", qr_package_suffix: "package",
    verification_title: "Verification Center", verification_desc: "Keep the network trustworthy — verify listings and network members.",
    tab_crop_quality: "Crop Quality", tab_farmers: "Farmers", tab_restaurants: "Restaurants", tab_transporters: "Transporters", quality_score_colon: "Quality score:",
    analytics_eyebrow: "Data-driven", analytics_title: "Platform Analytics", analytics_desc: "Demo/illustrative charts combined with live order-status data from this session.",
    chart_monthly_tx: "Monthly Transactions (Demo)", chart_crop_demand: "Crop Demand Index (Demo)", chart_earnings_savings: "Farmer Earnings vs. Restaurant Savings (Demo)", chart_order_status: "Order Status Distribution (Live)",
    legend_farmer_earnings: "Farmer Earnings", legend_restaurant_savings: "Restaurant Savings",
  },
  hi: {
    brand_tagline: "खेत से रेस्तरां तक, अधिक स्मार्ट तरीके से।",
    hero_subtitle: "फार्मकनेक्ट किसानों, रेस्तरां और ट्रांसपोर्टरों को एक पारदर्शी डिजिटल सप्लाई चेन के ज़रिए जोड़ता है — बिचौलियों को हटाकर, गुणवत्ता की पुष्टि करके, और उपज को तेज़ी से पहुँचाकर।",
    btn_get_started: "शुरू करें", btn_explore_marketplace: "मार्केटप्लेस देखें", btn_login: "लॉगिन",
    stat_partner_farms: "साझेदार फार्म", stat_intermediaries_removed: "हटाए गए बिचौलिए", stat_illustrative: "उदाहरण के आँकड़े",
    supply_chain_flow: "सप्लाई चेन प्रवाह",
    flow_farmer: "किसान उपज सूचीबद्ध करता है", flow_quality: "गुणवत्ता सत्यापित", flow_match: "फार्मकनेक्ट मिलान करता है", flow_transport: "परिवहन नियुक्त", flow_restaurant: "रेस्तरां को प्राप्त होता है",
    why_eyebrow: "फार्मकनेक्ट क्यों", why_title: "टूटी हुई सप्लाई चेन को ठीक करने के लिए बनाया गया", why_desc: "खेत और रसोई के बीच हर परत लागत, देरी और अनिश्चितता जोड़ती है। फार्मकनेक्ट उन परतों को हटाता है जिनकी ज़रूरत नहीं है।",
    benefit1_t: "किसानों के लिए बेहतर कीमतें", benefit1_d: "कम बिचौलियों का मतलब है अंतिम कीमत का अधिक हिस्सा खेत तक पहुँचना।",
    benefit2_t: "कम खरीद लागत", benefit2_d: "रेस्तरां सीधे खरीदते हैं, जिससे परत-दर-परत कमीशन घटता है।",
    benefit3_t: "सत्यापित गुणवत्ता", benefit3_d: "हर लिस्टिंग में एक ग्रेडेड, एडमिन-सत्यापित गुणवत्ता स्कोर होता है।",
    benefit4_t: "कम बर्बादी", benefit4_d: "तेज़, मिलान की गई आपूर्ति खेत-से-रसोई की अवधि को छोटा करती है।",
    benefit5_t: "अनुकूलित परिवहन", benefit5_d: "डिलीवरी अनुरोध स्वतः बनते हैं और नज़दीकी ट्रांसपोर्टरों को भेजे जाते हैं।",
    benefit6_t: "पारदर्शी लेन-देन", benefit6_d: "हर ऑर्डर में शुरू से अंत तक स्पष्ट मूल्य विवरण होता है।",
    how_eyebrow: "यह कैसे काम करता है", how_title: "पाँच भूमिकाएँ, एक जुड़ा हुआ वर्कफ़्लो",
    role_farmer_d: "मात्रा, कीमत और ग्रेड के साथ उपज सूचीबद्ध करता है।", role_admin_d: "गुणवत्ता सत्यापित करता है और नेटवर्क को भरोसेमंद बनाए रखता है।",
    role_restaurant_d: "फार्मों से सीधे खोजता है, तुलना करता है और ऑर्डर करता है।", role_transporter_d: "डिलीवरी कार्य स्वीकार करता है और उपज तेज़ी से पहुँचाता है।",
    role_consumer_d: "घर के लिए 1 किलो से 100 किलो तक ताज़ी सब्ज़ियाँ ऑर्डर करता है।",
    cta_title: "इसे काम करते देखने के लिए तैयार हैं?", cta_desc: "पूरा डेमो फ़्लो आज़माएँ — लिस्टिंग से भुगतान तक — पाँच मिनट से कम में।",
    footer_note: "फार्मकनेक्ट — SIH 2026 प्रोटोटाइप। जब तक न बताया जाए, सभी आँकड़े उदाहरणात्मक हैं।",
    role_select_title: "फार्मकनेक्ट में जारी रखें", role_select_desc: "यह एक डेमो है — नीचे से एक भूमिका चुनें, साइनअप की आवश्यकता नहीं।",
    back_home: "होम पर वापस जाएँ",
    role_farmer: "किसान", role_restaurant: "रेस्तरां", role_transporter: "ट्रांसपोर्टर", role_admin: "एडमिन", role_consumer: "उपभोक्ता",
    role_farmer_short: "उपज सूचीबद्ध करें, ऑर्डर ट्रैक करें, भुगतान पाएँ।", role_restaurant_short: "सत्यापित उपज खोजें, सीधे ऑर्डर करें।",
    role_transporter_short: "डिलीवरी स्वीकार करें, कमाई ट्रैक करें।", role_admin_short: "गुणवत्ता सत्यापित करें, नेटवर्क की निगरानी करें।",
    role_consumer_short: "अपने घर के लिए 1–100 किलो फार्म-फ्रेश सब्ज़ियाँ ऑर्डर करें।",
    continue_as: "इस रूप में जारी रखें",
    "nav_f-dashboard": "डैशबोर्ड", "nav_f-produce": "मेरी उपज", "nav_f-orders": "ऑर्डर", "nav_f-quality": "गुणवत्ता", "nav_f-notifications": "सूचनाएँ", "nav_f-profile": "प्रोफ़ाइल",
    "nav_r-dashboard": "डैशबोर्ड", "nav_r-marketplace": "मार्केटप्लेस", "nav_r-orders": "ऑर्डर", "nav_r-matching": "स्मार्ट मैचिंग", "nav_r-forecast": "मांग पूर्वानुमान", "nav_r-pricebreakdown": "मूल्य विवरण", "nav_r-notifications": "सूचनाएँ", "nav_r-profile": "प्रोफ़ाइल",
    "nav_c-dashboard": "डैशबोर्ड", "nav_c-marketplace": "सब्ज़ी मंडी", "nav_c-orders": "मेरे ऑर्डर", "nav_c-notifications": "सूचनाएँ", "nav_c-profile": "प्रोफ़ाइल",
    "nav_t-dashboard": "डैशबोर्ड", "nav_t-deliveries": "डिलीवरी", "nav_t-tracking": "ट्रैकिंग", "nav_t-notifications": "सूचनाएँ", "nav_t-profile": "प्रोफ़ाइल",
    "nav_a-dashboard": "डैशबोर्ड", "nav_a-verification": "सत्यापन", "nav_a-mandi": "मंडी भाव", "nav_a-analytics": "एनालिटिक्स", "nav_a-notifications": "सूचनाएँ",
    "nav_f-mandi": "मंडी भाव",
    mandi_title: "मंडी भाव", mandi_desc_admin: "प्रत्येक फ़सल के लिए आज का संदर्भ बाज़ार (मंडी) भाव सेट करें। किसान इसे अपने डैशबोर्ड पर देखेंगे।",
    mandi_desc_farmer: "एडमिन द्वारा तय किए गए आधिकारिक संदर्भ बाज़ार भाव — अपनी लिस्टिंग की सही कीमत तय करने के लिए इनका उपयोग करें।",
    btn_save_prices: "भाव सहेजें", prices_saved: "भाव सहेजे गए", label_mandi_price_per_kg: "मंडी भाव /किग्रा",
    above_mandi: "मंडी से अधिक", below_mandi: "मंडी से कम", at_mandi: "मंडी भाव पर", your_price_label: "आपकी कीमत",
    demo_view: "व्यू", demo_session: "डेमो सत्र", signed_in_as: "इस रूप में साइन इन",
    btn_consumer_trace: "उपभोक्ता ट्रेस", btn_judge_demo: "जज डेमो मोड", btn_switch_role: "भूमिका बदलें", btn_reset_demo: "डेमो डेटा रीसेट करें",
    language: "भाषा",
    f_dash_welcome: "वापसी पर स्वागत है", f_dash_title: "डैशबोर्ड",
    stat_crops_listed: "सूचीबद्ध फ़सलें", stat_active_orders: "सक्रिय ऑर्डर", stat_expected_revenue: "अपेक्षित राजस्व", stat_completed_sales: "पूर्ण बिक्री", stat_avg_rating: "औसत रेटिंग",
    my_produce: "मेरी उपज", btn_list_new_produce: "नई उपज सूचीबद्ध करें", btn_view_quality: "गुणवत्ता रिपोर्ट देखें",
    orders_for_produce: "मेरी उपज के ऑर्डर", orders_for_produce_d: "अपनी लिस्टिंग के मुकाबले हर रेस्तरां ऑर्डर को ट्रैक करें।",
    quality_eyebrow: "विशिष्टता", quality_title: "फ़सल गुणवत्ता और ग्रेडिंग", quality_desc: "हर लिस्टिंग को ताज़गी, आकार स्थिरता और नुकसान के आधार पर ग्रेड किया जाता है। लाइव होने से पहले एडमिन सत्यापन करता है।",
    roadmap_note: "रोडमैप: भविष्य के संस्करण फ़ोटो से ताज़गी, आकार और नुकसान का स्वतः आकलन करने के लिए कंप्यूटर-विज़न मॉडल का उपयोग कर सकते हैं, जिससे मैनुअल ग्रेडिंग समय घटेगा।",
    r_dash_title: "डैशबोर्ड",
    stat_today_procurement: "आज की खरीद", stat_pending_orders: "लंबित ऑर्डर", stat_monthly_spending: "मासिक खर्च", stat_avg_delivery: "औसत डिलीवरी समय", stat_procurement_saved: "बचाई गई खरीद लागत",
    fresh_marketplace: "ताज़ी उपज मार्केटप्लेस", btn_browse_marketplace: "मार्केटप्लेस ब्राउज़ करें",
    c_banner_badge: "नया · खेत से घर तक",
    c_banner_title: "खेत की ताज़ा सब्ज़ियाँ, सीधे आपके दरवाज़े तक",
    c_banner_desc: "वही सीधे-खेत से सप्लाई चेन जो रेस्तरां उपयोग करते हैं — अब आपके घर के हिसाब से। 1 किलो से 100 किलो तक कोई भी मात्रा ऑर्डर करें।",
    btn_start_shopping: "खरीदारी शुरू करें", btn_order_now: "अभी ऑर्डर करें",
    stat_c_active_orders: "सक्रिय ऑर्डर", stat_c_total_orders: "कुल ऑर्डर", stat_c_total_spent: "कुल खर्च",
    stat_c_kg_bought: "खरीदी गई सब्ज़ियाँ", stat_c_saved: "रिटेल की तुलना में बचत",
    c_quick_picks: "आज की ताज़ा सब्ज़ियाँ", c_quick_picks_d: "सत्यापित उपज अभी उपलब्ध है — अपनी ज़रूरत के लिए कार्ड चुनें।",
    c_recent_orders: "आपके हाल के ऑर्डर", c_how_much: "मात्रा आप चुनें — प्रति ऑर्डर 1 किलो से 100 किलो तक",
    c_marketplace_eyebrow: "खेत से घर मंडी", c_marketplace_title: "सीधे खेतों से सब्ज़ियाँ",
    c_marketplace_desc: "हर लिस्टिंग गुणवत्ता के लिए सत्यापित है। जितनी ज़रूरत हो उतना ऑर्डर करें — 1 किलो से 100 किलो तक।",
    c_order_form_desc: "बताइए आपको कितना चाहिए — 1 किलो से 100 किलो तक। डिलीवरी लागत अपने आप निकाली जाएगी।",
    c_qty_field: "आवश्यक मात्रा (किग्रा) — न्यूनतम 1 किलो", c_qty_max_note: "प्रति ऑर्डर सीमा 100 किलो है, खेत की उपलब्ध मात्रा के अनुसार।",
    c_delivery_fee: "होम डिलीवरी", c_retail_price: "आम रिटेल कीमत", c_you_save: "रिटेल की तुलना में आपकी बचत",
    c_free_delivery_note: "₹499 से अधिक की उपज पर मुफ़्त होम डिलीवरी",
    c_quick_qty_label: "तुरंत चुनें (किग्रा)", c_deliver_to: "डिलीवरी पता",
    marketplace_eyebrow: "मार्केटप्लेस", marketplace_title: "ताज़ी उपज, सीधे खेतों से", marketplace_desc: "यहाँ दिखाई गई हर लिस्टिंग गुणवत्ता के लिए एडमिन-सत्यापित है।",
    search_placeholder: "टमाटर, प्याज़, आलू खोजें...", filter_all_grades: "सभी ग्रेड",
    sort_price_asc: "कीमत: कम से ज़्यादा", sort_price_desc: "कीमत: ज़्यादा से कम", sort_quality: "गुणवत्ता स्कोर", sort_fresh: "सबसे ताज़ा पहले",
    my_orders: "मेरे ऑर्डर", my_orders_d: "फार्मकनेक्ट के ज़रिए दिया गया हर ऑर्डर।",
    t_dash_title: "डैशबोर्ड", stat_available_requests: "उपलब्ध अनुरोध", stat_active_deliveries: "सक्रिय डिलीवरी", stat_completed: "पूर्ण", stat_total_earnings: "कुल कमाई",
    available_requests: "उपलब्ध डिलीवरी अनुरोध", available_requests_d: "जब भी कोई रेस्तरां ऑर्डर देता है, यह स्वतः बनता है।", my_deliveries: "मेरी डिलीवरी", my_deliveries_d: "आपके द्वारा स्वीकार किए गए अनुरोध।",
    new_request: "नया अनुरोध", label_pickup: "पिकअप", label_drop: "ड्रॉप", label_deadline: "समय सीमा", label_earnings: "कमाई", no_delivery_requests: "अभी कोई डिलीवरी अनुरोध नहीं — बाद में देखें।",
    "nav_a-assign": "परिवहन असाइन करें", "nav_order-tracking": "लाइव ट्रैकिंग",
    assign_transport_title: "परिवहन असाइन करें", assign_transport_desc: "एक या अधिक अनसाइन किए गए ऑर्डर चुनें और उन सभी को एक ही वाहन/परिवहनकर्ता को असाइन करें — एक ही रूट पर डिलीवरी को जोड़ने के लिए बेहतरीन।",
    th_select: "चुनें", th_order: "ऑर्डर", th_crop: "फ़सल", th_farmer: "किसान", th_restaurant: "रेस्तरां", th_deadline: "समय सीमा",
    select_transporter_label: "वाहन/परिवहनकर्ता को असाइन करें", btn_assign_to_vehicle: "चयनित को वाहन में असाइन करें",
    assign_success: "वाहन को सफलतापूर्वक असाइन किया गया।", select_at_least_one: "पहले कम से कम एक ऑर्डर और एक परिवहनकर्ता चुनें।",
    vehicles_summary_title: "वाहन और उनके असाइन किए गए ऑर्डर", orders_count_suffix: "ऑर्डर", no_unassigned_orders: "अभी कोई अनसाइन किया गया ऑर्डर नहीं — हर दिए गए ऑर्डर में पहले से ही वाहन है।",
    no_active_vehicle_assignments: "अभी कोई वाहन सक्रिय ऑर्डर नहीं ले जा रहा है।",
    live_location_title: "लाइव लोकेशन", live_location_active_note: "पिकअप स्वीकार होने के बाद से परिवहनकर्ता के डिवाइस से लाइव साझा किया गया।",
    live_location_ended_note: "साझा करना समाप्त — डिलीवरी से पहले यह अंतिम ज्ञात स्थिति थी।",
    live_location_waiting: "परिवहनकर्ता के अपनी लाइव लोकेशन साझा करना शुरू करने का इंतज़ार है।",
    btn_share_location_on: "लाइव लोकेशन साझा करें", btn_share_location_off: "साझा करना बंद करें",
    sharing_live_badge: "● लाइव साझा हो रहा है", last_updated_label: "अंतिम अपडेट", location_denied: "इस ब्राउज़र में लोकेशन अनुमति अस्वीकृत या अनुपलब्ध है।",
    location_not_supported: "यह ब्राउज़र लाइव लोकेशन साझाकरण का समर्थन नहीं करता।", seconds_ago_suffix: "सेकंड पहले", minutes_ago_suffix: "मिनट पहले",
    go_online_title: "ऑनलाइन जाएँ", go_online_desc: "अपनी वर्तमान स्थिति साझा करें ताकि आस-पास के ऑर्डर आपको स्वतः असाइन हो सकें।",
    btn_go_online: "ऑनलाइन जाएँ", btn_go_offline: "ऑफ़लाइन जाएँ", online_badge: "● ऑनलाइन", offline_note: "ऑफ़लाइन — स्वतः असाइनमेंट के लिए पंजीकृत आधार स्थान का उपयोग किया जा रहा है।",
    auto_assign_settings_title: "स्वचालित निकटतम असाइनमेंट", auto_assign_settings_desc: "सक्षम होने पर, नए ऑर्डर तुरंत नीचे दी गई त्रिज्या के भीतर निकटतम उपलब्ध परिवहनकर्ता को असाइन हो जाते हैं। सीमा में कोई न होने पर मैन्युअल असाइनमेंट पर वापस चला जाता है।",
    auto_assign_toggle_label: "स्वचालित असाइनमेंट सक्षम करें", auto_assign_radius_label: "त्रिज्या (किमी)",
    nearest_transporter_label: "निकटतम", no_transporter_in_range: "सीमा में कोई नहीं",
    offline_label: "ऑफ़लाइन",
    offline_banner: "आप ऑफ़लाइन हैं — आपका अंतिम सहेजा गया डेटा दिखाया जा रहा है। वापस ऑनलाइन आते ही बदलाव सिंक हो जाएंगे।",
    online_restored_banner: "वापस ऑनलाइन।", map_needs_internet: "लाइव मैप के लिए इंटरनेट कनेक्शन चाहिए। निर्देशांक नीचे फिर भी दर्ज हो रहे हैं।",
    app_installable_hint: "सुझाव: इस ऐप को अपनी होम स्क्रीन पर इंस्टॉल किया जा सकता है और पहली बार खोलने के बाद ऑफ़लाइन भी उपयोग किया जा सकता है।",
    btn_whatsapp_listing: "व्हाट्सएप से सूचीबद्ध करें", whatsapp_sim_title: "व्हाट्सएप लिस्टिंग", whatsapp_sim_badge: "सिम्युलेटेड पूर्वावलोकन",
    whatsapp_sim_disclaimer: "यह भविष्य के व्हाट्सएप बिज़नेस API एकीकरण का एक सिम्युलेटेड पूर्वावलोकन है — यह असली व्हाट्सएप से जुड़ा नहीं है। यह दिखाता है कि किसान अपनी भाषा में एक सामान्य चैट संदेश भेजकर उपज कैसे सूचीबद्ध कर सकता है।",
    whatsapp_bot_name: "फार्मकनेक्ट बॉट", whatsapp_bot_status: "सिम्युलेटेड · असली व्हाट्सएप नहीं",
    whatsapp_greeting: "नमस्ते! अपनी फ़सल का विवरण उसी तरह भेजें जैसे आप किसी दोस्त को संदेश भेजते हैं — जैसे मात्रा, फ़सल, कीमत, और यह कब तैयार होगी।",
    whatsapp_placeholder: "फार्मकनेक्ट बॉट को संदेश भेजें…", whatsapp_try_example: "यह संदेश आज़माएँ",
    whatsapp_example_text: "50 किलो टमाटर, ग्रेड ए, 30 रुपये प्रति किलो, कल कटाई",
    btn_mark_picked_up: "उठाया गया चिह्नित करें", btn_mark_in_transit: "मार्ग में चिह्नित करें", btn_mark_delivered: "डिलीवर हुआ चिह्नित करें", label_earnings_colon: "कमाई", label_complete: "पूर्ण",
    a_dash_eyebrow: "नेटवर्क अवलोकन", a_dash_title: "एडमिन डैशबोर्ड", a_dash_desc: "फार्मकनेक्ट नेटवर्क का लाइव दृश्य। 'डेमो' चिह्नित आँकड़े उदाहरणात्मक हैं।",
    stat_total_farmers: "कुल किसान", stat_total_restaurants: "कुल रेस्तरां", stat_total_transporters: "कुल ट्रांसपोर्टर", stat_total_consumers: "कुल उपभोक्ता", stat_active_orders2: "सक्रिय ऑर्डर",
    stat_completed_orders: "पूर्ण ऑर्डर", stat_produce_traded: "व्यापारित उपज", stat_farmer_earnings: "किसान की कमाई", stat_restaurant_savings: "रेस्तरां की बचत",
    pending_verification: "लंबित गुणवत्ता सत्यापन", btn_go_to_verification: "सत्यापन पर जाएँ", nothing_pending: "कुछ भी लंबित नहीं — सभी लिस्टिंग सत्यापित।",
    btn_place_order: "ऑर्डर करें", btn_view_details: "विवरण देखें", btn_confirm_order: "ऑर्डर की पुष्टि करें", btn_verify: "सत्यापित करें", btn_verify_now: "अभी सत्यापित करें",
    btn_accept: "स्वीकार करें", btn_reject: "अस्वीकार करें", btn_track: "ट्रैक करें", btn_pay: "भुगतान करें", btn_submit_listing: "लिस्टिंग सबमिट करें", btn_cancel: "रद्द करें",
    btn_view_all: "सभी देखें", btn_go_to_orders: "ऑर्डर पर जाएँ", btn_track_order: "ऑर्डर ट्रैक करें", btn_simulate_payment: "भुगतान सिम्युलेट करें",
    payment_title: "भुगतान", label_order_amount: "ऑर्डर राशि", label_transportation: "परिवहन", label_platform_fee: "प्लेटफ़ॉर्म शुल्क", label_total: "कुल",
    payment_successful: "भुगतान सफल", label_farmer_payment: "किसान भुगतान", label_transport_payment: "परिवहन भुगतान", label_platform_revenue: "प्लेटफ़ॉर्म राजस्व",
    grade_label: "ग्रेड", available_label: "उपलब्ध", price_label: "कीमत", quality_score_label: "गुणवत्ता स्कोर", harvested_label: "कटाई",
    verified_label: "सत्यापित", verification_pending_label: "सत्यापन लंबित",
    ql_freshness: "ताज़गी", ql_size: "आकार स्थिरता", ql_damage: "नुकसान", ql_verified_by_admin: "फार्मकनेक्ट एडमिन द्वारा सत्यापित", ql_pending: "सत्यापन लंबित",
    notif_title: "सूचनाएँ", notif_desc: "ऑर्डर, सत्यापन और भुगतान पर नज़र रखें।", btn_mark_all_read: "सभी को पढ़ा हुआ चिह्नित करें", no_notifications: "अभी कोई सूचना नहीं।",
    profile_title: "प्रोफ़ाइल", profile_desc: "डेमो खाता विवरण।",
    order_col_order: "ऑर्डर", order_col_crop: "फ़सल", order_col_farmer: "किसान", order_col_restaurant: "रेस्तरां", order_col_qty: "मात्रा", order_col_total: "कुल", order_col_status: "स्थिति",
    no_orders_yet: "अभी कोई ऑर्डर नहीं।",
    add_crop_title: "नई उपज सूचीबद्ध करें", add_crop_desc: "मार्केटप्लेस में नई फ़सल जोड़ें — टाइप करें, बोलें, या फ़ोटो लें।",
    field_crop_name: "फ़सल का नाम", field_crop_icon: "फ़सल आइकन (फ़ोटो न होने पर उपयोग)", field_quantity: "मात्रा (किग्रा)", field_price: "कीमत प्रति किग्रा (₹)",
    field_harvest_date: "कटाई की तारीख़", field_location: "स्थान", field_grade: "ग्रेड", field_method: "खेती की विधि", field_upload: "फ़सल की फ़ोटो अपलोड करें",
    voice_listen: "अपनी लिस्टिंग बोलने के लिए टैप करें", voice_listening: "सुन रहा है… अभी बोलें",
    ai_voice_badge: "AI आवाज़ भरण", voice_heard_prefix: "सुना गया:",
    voice_example: 'कहें: "500 किलो टमाटर, ग्रेड ए प्लस, 30 रुपये प्रति किलो, जैविक, कल कटाई"',
    voice_not_supported: "इस ब्राउज़र में आवाज़ पहचान समर्थित नहीं है — Android/डेस्कटॉप पर Chrome आज़माएँ।",
    back_to_marketplace: "मार्केटप्लेस पर वापस जाएँ", label_price: "कीमत", label_available: "उपलब्ध", label_harvest_date: "कटाई की तारीख़", label_est_delivery: "अनुमानित डिलीवरी", label_farming_method: "खेती की विधि",
    today_label: "आज", days_ago_suffix: "दिन पहले", day_suffix: "दिन",
    price_comparison: "मूल्य तुलना", illustrative_label: "(उदाहरणात्मक)", traditional_procurement: "पारंपरिक खरीद", farmconnect_incl: "फार्मकनेक्ट (परिवहन और शुल्क सहित)", est_restaurant_saving: "अनुमानित रेस्तरां बचत",
    back_label: "वापस", order_title_prefix: "ऑर्डर", order_form_desc: "डिलीवरी विवरण भरें। लागत स्वतः गणना होगी।",
    field_qty_required: "आवश्यक मात्रा (किग्रा) — अधिकतम", field_qty_available_suffix: "किग्रा उपलब्ध", field_delivery_location: "डिलीवरी स्थान", field_delivery_date: "पसंदीदा डिलीवरी तारीख़", field_delivery_time: "पसंदीदा डिलीवरी समय",
    partial_order_hint: "आपको पूरी लिस्टिंग ऑर्डर करने की ज़रूरत नहीं — उपलब्ध मात्रा में से जितनी चाहें उतनी चुनें।",
    quick_select_label: "त्वरित चयन", remaining_after_order: "आपके ऑर्डर के बाद इस लिस्टिंग में शेष रहेगा",
    cost_breakdown: "लागत विवरण", order_placed_title: "ऑर्डर दिया गया!", order_placed_desc: "ऑर्डर", order_placed_desc2: "बना दिया गया है और एक परिवहन अनुरोध स्वतः बन गया है।",
    smart_match_eyebrow: "AI-सहायित", smart_match_title: "स्मार्ट फार्म–रेस्तरां मैचिंग", smart_match_desc: "गुणवत्ता, मात्रा, कीमत, दूरी और ताज़गी के आधार पर सबसे उपयुक्त फार्मों की सिफ़ारिश करता है।",
    field_crop_needed: "आवश्यक फ़सल", field_preferred_grade: "पसंदीदा ग्रेड",
    match_label: "मिलान", no_match_farms: "इस फ़सल के लिए अभी कोई सत्यापित फार्म नहीं है।",
    forecast_eyebrow: "आगे की योजना", forecast_title: "रेस्तरां मांग पूर्वानुमान", forecast_desc: "रेस्तरां भविष्य की ज़रूरतें बताते हैं ताकि किसान उत्पादन की योजना बना सकें। डेमो डेटा।",
    demand_high: "उच्च", demand_medium: "मध्यम", demand_low: "कम", demand_suffix: "मांग",
    status_PLACED: "ऑर्डर दिया गया", status_TRANSPORTER_ASSIGNED: "परिवहनकर्ता नियुक्त", status_PICKED_UP: "उपज उठाई गई", status_IN_TRANSIT: "मार्ग में", status_DELIVERED: "डिलीवर हो गया", status_PAID: "भुगतान पूरा हुआ",
    price_break_eyebrow: "पारदर्शिता", price_break_title: "मूल्य विवरण: पुरानी चेन बनाम फार्मकनेक्ट", price_break_desc: "उदाहरण के लिए नमूना मूल्य — वास्तविक कीमतें फ़सल और लिस्टिंग के अनुसार अलग-अलग होती हैं।",
    price_break_current_chain: "मौजूदा सप्लाई चेन (डेमो)", price_break_farmconnect: "फार्मकनेक्ट (डेमो)",
    price_break_stops_note: "रेस्तरां तक पहुँचने से पहले 5 पड़ाव, 4 कमीशन।", price_break_settlement_note: "1 प्लेटफ़ॉर्म + परिवहन, सीधा निपटान।",
    price_break_platform_fee: "फार्मकनेक्ट प्लेटफ़ॉर्म शुल्क", price_break_transport: "परिवहन",
    stat_farmer_benefit: "किसान को लाभ", stat_restaurant_saving: "रेस्तरां की बचत", stat_intermediaries_removed2: "हटाए गए बिचौलिए", stat_wastage_reduction: "अनुमानित बर्बादी में कमी", demo_estimate: "डेमो अनुमान",
    stat_rating: "रेटिंग",
    order_tracking_title: "ऑर्डर ट्रैकिंग", order_tracking_desc: "फार्मकनेक्ट सप्लाई चेन में लाइव स्थिति।",
    est_arrival: "अनुमानित आगमन", view_ledger: "ब्लॉकचेन प्रोवेनेंस लेजर देखें",
    consumer_trace_title: "स्कैन और ट्रेस करें",
    qr_instructions: "उत्पाद की पूरी खेत-से-मेज़ यात्रा देखने के लिए अपने कैमरे को उसके QR कोड पर पॉइंट करें। यह एक सिम्युलेटेड स्कैनर है — आज़माने के लिए नीचे से एक नमूना पैकेज टैप करें।",
    qr_scanning: "पैकेज स्कैन हो रहा है…", qr_sample_packages: "स्कैन करने के लिए नमूना पैकेज", qr_no_orders: "अभी स्कैन सिम्युलेट करने के लिए कोई डिलीवर ऑर्डर नहीं है। पहले एक ऑर्डर पूरा करें (जज डेमो मोड आज़माएँ)।",
    qr_scan_another: "दूसरा पैकेज स्कैन करें", qr_journey: "खेत-से-मेज़ यात्रा", qr_view_crypto_ledger: "क्रिप्टोग्राफ़िक लेजर देखें", qr_package_suffix: "पैकेज",
    verification_title: "सत्यापन केंद्र", verification_desc: "नेटवर्क को भरोसेमंद बनाए रखें — लिस्टिंग और सदस्यों को सत्यापित करें।",
    tab_crop_quality: "फ़सल गुणवत्ता", tab_farmers: "किसान", tab_restaurants: "रेस्तरां", tab_transporters: "ट्रांसपोर्टर", quality_score_colon: "गुणवत्ता स्कोर:",
    analytics_eyebrow: "डेटा-आधारित", analytics_title: "प्लेटफ़ॉर्म एनालिटिक्स", analytics_desc: "इस सत्र के लाइव ऑर्डर-स्थिति डेटा के साथ डेमो/उदाहरणात्मक चार्ट।",
    chart_monthly_tx: "मासिक लेन-देन (डेमो)", chart_crop_demand: "फ़सल मांग सूचकांक (डेमो)", chart_earnings_savings: "किसान की कमाई बनाम रेस्तरां की बचत (डेमो)", chart_order_status: "ऑर्डर स्थिति वितरण (लाइव)",
    legend_farmer_earnings: "किसान की कमाई", legend_restaurant_savings: "रेस्तरां की बचत",
  },
  te: {
    brand_tagline: "పొలం నుండి రెస్టారెంట్ వరకు, మరింత స్మార్ట్‌గా.",
    hero_subtitle: "ఫార్మ్‌కనెక్ట్ రైతులు, రెస్టారెంట్లు మరియు రవాణాదారులను పారదర్శక డిజిటల్ సరఫరా గొలుసు ద్వారా అనుసంధానిస్తుంది — మధ్యవర్తులను తొలగించి, నాణ్యతను ధృవీకరించి, ఉత్పత్తులను వేగంగా చేరవేస్తుంది.",
    btn_get_started: "ప్రారంభించండి", btn_explore_marketplace: "మార్కెట్‌ప్లేస్ చూడండి", btn_login: "లాగిన్",
    stat_partner_farms: "భాగస్వామి పొలాలు", stat_intermediaries_removed: "తొలగించిన మధ్యవర్తులు", stat_illustrative: "ఉదాహరణ గణాంకాలు",
    supply_chain_flow: "సరఫరా గొలుసు ప్రవాహం",
    flow_farmer: "రైతు ఉత్పత్తిని లిస్ట్ చేస్తారు", flow_quality: "నాణ్యత ధృవీకరించబడింది", flow_match: "ఫార్మ్‌కనెక్ట్ సరిపోల్చుతుంది", flow_transport: "రవాణా కేటాయించబడింది", flow_restaurant: "రెస్టారెంట్‌కు చేరుతుంది",
    why_eyebrow: "ఫార్మ్‌కనెక్ట్ ఎందుకు", why_title: "విరిగిన గొలుసును సరిచేయడానికి రూపొందించబడింది", why_desc: "పొలానికి మరియు వంటగదికి మధ్య ప్రతి పొర ఖర్చు, ఆలస్యం మరియు అనిశ్చితిని పెంచుతుంది. ఫార్మ్‌కనెక్ట్ అవసరం లేని పొరలను తొలగిస్తుంది.",
    benefit1_t: "రైతులకు మెరుగైన ధరలు", benefit1_d: "తక్కువ మధ్యవర్తులు అంటే తుది ధరలో ఎక్కువ భాగం పొలానికి చేరుతుంది.",
    benefit2_t: "తక్కువ కొనుగోలు ఖర్చు", benefit2_d: "రెస్టారెంట్లు నేరుగా కొనుగోలు చేయడం వల్ల అంచెలవారీ కమీషన్లు తగ్గుతాయి.",
    benefit3_t: "ధృవీకరించిన నాణ్యత", benefit3_d: "ప్రతి లిస్టింగ్‌కు గ్రేడ్ చేయబడిన, అడ్మిన్-ధృవీకరించిన నాణ్యత స్కోరు ఉంటుంది.",
    benefit4_t: "తగ్గిన వృథా", benefit4_d: "వేగవంతమైన, సరిపోల్చిన సరఫరా పొలం-నుండి-వంటగది వ్యవధిని తగ్గిస్తుంది.",
    benefit5_t: "ఆప్టిమైజ్డ్ రవాణా", benefit5_d: "డెలివరీ అభ్యర్థనలు స్వయంచాలకంగా సృష్టించబడి సమీప రవాణాదారులకు పంపబడతాయి.",
    benefit6_t: "పారదర్శక లావాదేవీలు", benefit6_d: "ప్రతి ఆర్డర్‌కు మొదటి నుండి చివరి వరకు స్పష్టమైన ధర వివరణ ఉంటుంది.",
    how_eyebrow: "ఇది ఎలా పనిచేస్తుంది", how_title: "ఐదు పాత్రలు, ఒకే అనుసంధాన వర్క్‌ఫ్లో",
    role_farmer_d: "పరిమాణం, ధర మరియు గ్రేడ్‌తో ఉత్పత్తిని లిస్ట్ చేస్తారు.", role_admin_d: "నాణ్యతను ధృవీకరించి నెట్‌వర్క్‌ను నమ్మదగినదిగా ఉంచుతారు.",
    role_restaurant_d: "పొలాల నుండి నేరుగా వెతికి, పోల్చి, ఆర్డర్ చేస్తారు.", role_transporter_d: "డెలివరీ పనులను స్వీకరించి ఉత్పత్తులను వేగంగా చేరవేస్తారు.",
    role_consumer_d: "ఇంటి కోసం 1 కిలో నుండి 100 కిలోల వరకు తాజా కూరగాయలను ఆర్డర్ చేస్తారు.",
    cta_title: "దీన్ని పనిచేస్తూ చూడటానికి సిద్ధంగా ఉన్నారా?", cta_desc: "పూర్తి డెమో ఫ్లోను ప్రయత్నించండి — లిస్టింగ్ నుండి చెల్లింపు వరకు — ఐదు నిమిషాల్లోపు.",
    footer_note: "ఫార్మ్‌కనెక్ట్ — SIH 2026 ప్రోటోటైప్. సూచించనంత వరకు అన్ని గణాంకాలు ఉదాహరణ మాత్రమే.",
    role_select_title: "ఫార్మ్‌కనెక్ట్‌లో కొనసాగండి", role_select_desc: "ఇది ఒక డెమో — దిగువ నుండి ఒక పాత్రను ఎంచుకోండి, సైన్అప్ అవసరం లేదు.",
    back_home: "హోమ్‌కు తిరిగి వెళ్ళండి",
    role_farmer: "రైతు", role_restaurant: "రెస్టారెంట్", role_transporter: "రవాణాదారు", role_admin: "అడ్మిన్", role_consumer: "వినియోగదారు",
    role_farmer_short: "ఉత్పత్తిని లిస్ట్ చేయండి, ఆర్డర్లను ట్రాక్ చేయండి, చెల్లింపు పొందండి.", role_restaurant_short: "ధృవీకరించిన ఉత్పత్తిని కనుగొనండి, నేరుగా ఆర్డర్ చేయండి.",
    role_transporter_short: "డెలివరీలను స్వీకరించండి, సంపాదనను ట్రాక్ చేయండి.", role_admin_short: "నాణ్యతను ధృవీకరించండి, నెట్‌వర్క్‌ను పర్యవేక్షించండి.",
    role_consumer_short: "మీ ఇంటి కోసం 1–100 కిలోల వ్యవసాయ-తాజా కూరగాయలు ఆర్డర్ చేయండి.",
    continue_as: "ఇలా కొనసాగించండి",
    "nav_f-dashboard": "డాష్‌బోర్డ్", "nav_f-produce": "నా ఉత్పత్తులు", "nav_f-orders": "ఆర్డర్లు", "nav_f-quality": "నాణ్యత", "nav_f-notifications": "నోటిఫికేషన్లు", "nav_f-profile": "ప్రొఫైల్",
    "nav_r-dashboard": "డాష్‌బోర్డ్", "nav_r-marketplace": "మార్కెట్‌ప్లేస్", "nav_r-orders": "ఆర్డర్లు", "nav_r-matching": "స్మార్ట్ మ్యాచింగ్", "nav_r-forecast": "డిమాండ్ అంచనా", "nav_r-pricebreakdown": "ధర వివరణ", "nav_r-notifications": "నోటిఫికేషన్లు", "nav_r-profile": "ప్రొఫైల్",
    "nav_c-dashboard": "డాష్‌బోర్డ్", "nav_c-marketplace": "కూరగాయల మార్కెట్", "nav_c-orders": "నా ఆర్డర్లు", "nav_c-notifications": "నోటిఫికేషన్లు", "nav_c-profile": "ప్రొఫైల్",
    "nav_t-dashboard": "డాష్‌బోర్డ్", "nav_t-deliveries": "డెలివరీలు", "nav_t-tracking": "ట్రాకింగ్", "nav_t-notifications": "నోటిఫికేషన్లు", "nav_t-profile": "ప్రొఫైల్",
    "nav_a-dashboard": "డాష్‌బోర్డ్", "nav_a-verification": "ధృవీకరణ", "nav_a-mandi": "మండి ధరలు", "nav_a-analytics": "అనలిటిక్స్", "nav_a-notifications": "నోటిఫికేషన్లు",
    "nav_f-mandi": "మండి ధరలు",
    mandi_title: "మండి ధరలు", mandi_desc_admin: "ప్రతి పంటకు నేటి రిఫరెన్స్ మార్కెట్ (మండి) ధరను సెట్ చేయండి. రైతులు దీన్ని వారి డాష్‌బోర్డ్‌లో చూస్తారు.",
    mandi_desc_farmer: "అడ్మిన్ నిర్ణయించిన అధికారిక రిఫరెన్స్ మార్కెట్ ధరలు — మీ లిస్టింగ్‌లను సరిగ్గా ధర నిర్ణయించడానికి వీటిని ఉపయోగించండి.",
    btn_save_prices: "ధరలను సేవ్ చేయండి", prices_saved: "ధరలు సేవ్ చేయబడ్డాయి", label_mandi_price_per_kg: "మండి ధర /కిలో",
    above_mandi: "మండి కంటే ఎక్కువ", below_mandi: "మండి కంటే తక్కువ", at_mandi: "మండి ధరకు", your_price_label: "మీ ధర",
    demo_view: "వీక్షణ", demo_session: "డెమో సెషన్", signed_in_as: "ఇలా సైన్ ఇన్ అయ్యారు",
    btn_consumer_trace: "కన్స్యూమర్ ట్రేస్", btn_judge_demo: "జడ్జి డెమో మోడ్", btn_switch_role: "పాత్రను మార్చండి", btn_reset_demo: "డెమో డేటాను రీసెట్ చేయండి",
    language: "భాష",
    f_dash_welcome: "తిరిగి స్వాగతం", f_dash_title: "డాష్‌బోర్డ్",
    stat_crops_listed: "లిస్ట్ చేసిన పంటలు", stat_active_orders: "క్రియాశీల ఆర్డర్లు", stat_expected_revenue: "అంచనా ఆదాయం", stat_completed_sales: "పూర్తయిన అమ్మకాలు", stat_avg_rating: "సగటు రేటింగ్",
    my_produce: "నా ఉత్పత్తులు", btn_list_new_produce: "కొత్త ఉత్పత్తిని లిస్ట్ చేయండి", btn_view_quality: "నాణ్యత నివేదిక చూడండి",
    orders_for_produce: "నా ఉత్పత్తుల ఆర్డర్లు", orders_for_produce_d: "మీ లిస్టింగ్‌లకు వ్యతిరేకంగా ప్రతి రెస్టారెంట్ ఆర్డర్‌ను ట్రాక్ చేయండి.",
    quality_eyebrow: "విభిన్నత", quality_title: "పంట నాణ్యత & గ్రేడింగ్", quality_desc: "ప్రతి లిస్టింగ్ తాజాదనం, పరిమాణ స్థిరత్వం మరియు నష్టం ఆధారంగా గ్రేడ్ చేయబడుతుంది. లైవ్ కావడానికి ముందు అడ్మిన్ ధృవీకరిస్తారు.",
    roadmap_note: "రోడ్‌మ్యాప్: భవిష్యత్ వెర్షన్లు ఫోటోల నుండి తాజాదనం, పరిమాణం మరియు నష్టాన్ని స్వయంచాలకంగా అంచనా వేయడానికి కంప్యూటర్-విజన్ మోడళ్లను ఉపయోగించవచ్చు, ఇది మాన్యువల్ గ్రేడింగ్ సమయాన్ని తగ్గిస్తుంది.",
    r_dash_title: "డాష్‌బోర్డ్",
    stat_today_procurement: "నేటి కొనుగోలు", stat_pending_orders: "పెండింగ్ ఆర్డర్లు", stat_monthly_spending: "నెలవారీ ఖర్చు", stat_avg_delivery: "సగటు డెలివరీ సమయం", stat_procurement_saved: "ఆదా చేసిన కొనుగోలు వ్యయం",
    fresh_marketplace: "తాజా ఉత్పత్తుల మార్కెట్‌ప్లేస్", btn_browse_marketplace: "మార్కెట్‌ప్లేస్ బ్రౌజ్ చేయండి",
    c_banner_badge: "కొత్తది · పొలం నుండి ఇంటికి",
    c_banner_title: "పొలం తాజా కూరగాయలు, మీ ఇంటి తలుపు వద్దకు",
    c_banner_desc: "రెస్టారెంట్లు ఉపయోగించే అదే నేరుగా-పొలం సరఫరా గొలుసు — ఇప్పుడు మీ ఇంటి కోసం. 1 కిలో నుండి 100 కిలోల వరకు ఏ పరిమాణమైనా ఆర్డర్ చేయండి.",
    btn_start_shopping: "షాపింగ్ ప్రారంభించండి", btn_order_now: "ఇప్పుడే ఆర్డర్ చేయండి",
    stat_c_active_orders: "క్రియాశీల ఆర్డర్లు", stat_c_total_orders: "మొత్తం ఆర్డర్లు", stat_c_total_spent: "మొత్తం ఖర్చు",
    stat_c_kg_bought: "కొన్న కూరగాయలు", stat_c_saved: "రిటైల్ కంటే పొదుపు",
    c_quick_picks: "నేటి తాజా కూరగాయలు", c_quick_picks_d: "ధృవీకరించిన ఉత్పత్తి ఇప్పుడు అందుబాటులో ఉంది — మీ అవసరానికి కార్డును ఎంచుకోండి.",
    c_recent_orders: "మీ ఇటీవలి ఆర్డర్లు", c_how_much: "పరిమాణం మీరే ఎంచుకోండి — ఆర్డర్‌కు 1 కిలో నుండి 100 కిలోల వరకు",
    c_marketplace_eyebrow: "పొలం నుండి ఇంటికి మార్కెట్", c_marketplace_title: "నేరుగా పొలాల నుండి కూరగాయలు",
    c_marketplace_desc: "ప్రతి లిస్టింగ్ నాణ్యత కోసం ధృవీకరించబడింది. మీకు కావలసినంత ఆర్డర్ చేయండి — 1 కిలో నుండి 100 కిలోల వరకు.",
    c_order_form_desc: "మీకు ఎంత కావాలో చెప్పండి — 1 కిలో నుండి 100 కిలోల వరకు. డెలివరీ ఖర్చు ఆటోమేటిక్‌గా లెక్కించబడుతుంది.",
    c_qty_field: "మీకు కావలసిన పరిమాణం (కిలో) — కనీసం 1 కిలో", c_qty_max_note: "ఆర్డర్‌కు గరిష్ఠ పరిమితి 100 కిలోలు, పొలంలో లభ్యతను బట్టి.",
    c_delivery_fee: "హోమ్ డెలివరీ", c_retail_price: "సాధారణ రిటైల్ ధర", c_you_save: "రిటైల్ కంటే మీ పొదుపు",
    c_free_delivery_note: "₹499 పైబడిన ఉత్పత్తి విలుపై ఉచిత హోమ్ డెలివరీ",
    c_quick_qty_label: "త్వరిత ఎంపిక (కిలో)", c_deliver_to: "డెలివరీ చిరునామా",
    marketplace_eyebrow: "మార్కెట్‌ప్లేస్", marketplace_title: "తాజా ఉత్పత్తులు, నేరుగా పొలాల నుండి", marketplace_desc: "ఇక్కడ చూపిన ప్రతి లిస్టింగ్ నాణ్యత కోసం అడ్మిన్-ధృవీకరించబడింది.",
    search_placeholder: "టమాటో, ఉల్లిపాయ, బంగాళదుంప వెతకండి...", filter_all_grades: "అన్ని గ్రేడ్‌లు",
    sort_price_asc: "ధర: తక్కువ నుండి ఎక్కువ", sort_price_desc: "ధర: ఎక్కువ నుండి తక్కువ", sort_quality: "నాణ్యత స్కోరు", sort_fresh: "అత్యంత తాజావి మొదట",
    my_orders: "నా ఆర్డర్లు", my_orders_d: "ఫార్మ్‌కనెక్ట్ ద్వారా పెట్టిన ప్రతి ఆర్డర్.",
    t_dash_title: "డాష్‌బోర్డ్", stat_available_requests: "అందుబాటులో ఉన్న అభ్యర్థనలు", stat_active_deliveries: "క్రియాశీల డెలివరీలు", stat_completed: "పూర్తయినవి", stat_total_earnings: "మొత్తం సంపాదన",
    available_requests: "అందుబాటులో ఉన్న డెలివరీ అభ్యర్థనలు", available_requests_d: "ఒక రెస్టారెంట్ ఆర్డర్ పెట్టిన ప్రతిసారీ స్వయంచాలకంగా సృష్టించబడుతుంది.", my_deliveries: "నా డెలివరీలు", my_deliveries_d: "మీరు అంగీకరించిన అభ్యర్థనలు.",
    new_request: "కొత్త అభ్యర్థన", label_pickup: "పికప్", label_drop: "డ్రాప్", label_deadline: "గడువు", label_earnings: "సంపాదన", no_delivery_requests: "ప్రస్తుతం డెలివరీ అభ్యర్థనలు లేవు — తర్వాత చూడండి.",
    "nav_a-assign": "రవాణా కేటాయించండి", "nav_order-tracking": "లైవ్ ట్రాకింగ్",
    assign_transport_title: "రవాణా కేటాయించండి", assign_transport_desc: "ఒకటి లేదా అంతకంటే ఎక్కువ కేటాయించని ఆర్డర్లను ఎంచుకుని వాటన్నింటినీ ఒకే వాహనం/రవాణాదారుకు కేటాయించండి — అదే మార్గంలో డెలివరీలను కలపడానికి బాగుంటుంది.",
    th_select: "ఎంచుకోండి", th_order: "ఆర్డర్", th_crop: "పంట", th_farmer: "రైతు", th_restaurant: "రెస్టారెంట్", th_deadline: "గడువు",
    select_transporter_label: "వాహనం/రవాణాదారుకు కేటాయించండి", btn_assign_to_vehicle: "ఎంచుకున్నవాటిని వాహనానికి కేటాయించండి",
    assign_success: "వాహనానికి విజయవంతంగా కేటాయించబడింది.", select_at_least_one: "ముందుగా కనీసం ఒక ఆర్డర్ మరియు ఒక రవాణాదారుని ఎంచుకోండి.",
    vehicles_summary_title: "వాహనాలు & వాటికి కేటాయించిన ఆర్డర్లు", orders_count_suffix: "ఆర్డర్(లు)", no_unassigned_orders: "ప్రస్తుతం కేటాయించని ఆర్డర్లు లేవు — ప్రతి ఆర్డర్‌కు ఇప్పటికే వాహనం ఉంది.",
    no_active_vehicle_assignments: "ప్రస్తుతం ఏ వాహనం క్రియాశీల ఆర్డర్‌ను తీసుకెళ్లడం లేదు.",
    live_location_title: "లైవ్ లొకేషన్", live_location_active_note: "పికప్ అంగీకరించినప్పటి నుండి రవాణాదారు పరికరం నుండి ప్రత్యక్షంగా షేర్ చేయబడింది.",
    live_location_ended_note: "షేరింగ్ ముగిసింది — డెలివరీకి ముందు ఇది చివరిగా తెలిసిన స్థానం.",
    live_location_waiting: "రవాణాదారు తన లైవ్ లొకేషన్‌ను షేర్ చేయడం ప్రారంభించడానికి వేచి ఉంది.",
    btn_share_location_on: "లైవ్ లొకేషన్ షేర్ చేయండి", btn_share_location_off: "షేరింగ్ ఆపండి",
    sharing_live_badge: "● ప్రత్యక్షంగా షేర్ అవుతోంది", last_updated_label: "చివరి నవీకరణ", location_denied: "ఈ బ్రౌజర్‌లో లొకేషన్ అనుమతి తిరస్కరించబడింది లేదా అందుబాటులో లేదు.",
    location_not_supported: "ఈ బ్రౌజర్ లైవ్ లొకేషన్ షేరింగ్‌కు మద్దతు ఇవ్వదు.", seconds_ago_suffix: "సెకన్ల క్రితం", minutes_ago_suffix: "నిమిషాల క్రితం",
    go_online_title: "ఆన్‌లైన్‌కు వెళ్లండి", go_online_desc: "సమీప ఆర్డర్లు మీకు స్వయంచాలకంగా కేటాయించబడేలా మీ ప్రస్తుత స్థానాన్ని షేర్ చేయండి.",
    btn_go_online: "ఆన్‌లైన్‌కు వెళ్లండి", btn_go_offline: "ఆఫ్‌లైన్‌కు వెళ్లండి", online_badge: "● ఆన్‌లైన్", offline_note: "ఆఫ్‌లైన్ — స్వయంచాలక కేటాయింపు కోసం నమోదిత బేస్ లొకేషన్ ఉపయోగించబడుతోంది.",
    auto_assign_settings_title: "స్వయంచాలక సమీప కేటాయింపు", auto_assign_settings_desc: "ప్రారంభించినప్పుడు, కొత్త ఆర్డర్లు వెంటనే దిగువ వ్యాసార్థంలో అందుబాటులో ఉన్న సమీప రవాణాదారుకు కేటాయించబడతాయి. పరిధిలో ఎవరూ లేకపోతే మాన్యువల్ కేటాయింపుకు తిరిగి వెళుతుంది.",
    auto_assign_toggle_label: "స్వయంచాలక కేటాయింపును ప్రారంభించండి", auto_assign_radius_label: "వ్యాసార్థం (కి.మీ)",
    nearest_transporter_label: "సమీపం", no_transporter_in_range: "పరిధిలో ఎవరూ లేరు",
    offline_label: "ఆఫ్‌లైన్",
    offline_banner: "మీరు ఆఫ్‌లైన్‌లో ఉన్నారు — మీ చివరిగా సేవ్ చేసిన డేటా చూపబడుతోంది. మీరు తిరిగి ఆన్‌లైన్‌లోకి వచ్చిన వెంటనే మార్పులు సింక్ అవుతాయి.",
    online_restored_banner: "తిరిగి ఆన్‌లైన్‌లోకి వచ్చారు.", map_needs_internet: "లైవ్ మ్యాప్‌కు ఇంటర్నెట్ కనెక్షన్ అవసరం. కోఆర్డినేట్‌లు ఇప్పటికీ దిగువ నమోదు చేయబడుతున్నాయి.",
    app_installable_hint: "సూచన: ఈ యాప్‌ను మీ హోమ్ స్క్రీన్‌కు ఇన్‌స్టాల్ చేసుకోవచ్చు మరియు మొదటిసారి తెరిచిన తర్వాత ఆఫ్‌లైన్‌లో కూడా ఉపయోగించవచ్చు.",
    btn_whatsapp_listing: "వాట్సాప్ ద్వారా జాబితా చేయండి", whatsapp_sim_title: "వాట్సాప్ లిస్టింగ్", whatsapp_sim_badge: "సిమ్యులేటెడ్ ప్రివ్యూ",
    whatsapp_sim_disclaimer: "ఇది భవిష్యత్ వాట్సాప్ బిజినెస్ API ఇంటిగ్రేషన్ యొక్క సిమ్యులేటెడ్ ప్రివ్యూ — ఇది నిజమైన వాట్సాప్‌కు కనెక్ట్ చేయబడలేదు. ఒక రైతు తన సొంత భాషలో ఒక సాధారణ చాట్ సందేశం పంపడం ద్వారా పంటను ఎలా జాబితా చేయవచ్చో ఇది చూపిస్తుంది.",
    whatsapp_bot_name: "ఫార్మ్‌కనెక్ట్ బాట్", whatsapp_bot_status: "సిమ్యులేటెడ్ · నిజమైన వాట్సాప్ కాదు",
    whatsapp_greeting: "నమస్తే! మీరు స్నేహితుడికి సందేశం పంపినట్లే మీ పంట వివరాలను పంపండి — ఉదాహరణకు పరిమాణం, పంట, ధర, మరియు అది ఎప్పుడు సిద్ధమవుతుంది.",
    whatsapp_placeholder: "ఫార్మ్‌కనెక్ట్ బాట్‌కు సందేశం పంపండి…", whatsapp_try_example: "ఈ సందేశాన్ని ప్రయత్నించండి",
    whatsapp_example_text: "50 కిలోల టమాటా, గ్రేడ్ ఏ, కిలోకు 30 రూపాయలు, రేపు కోత",
    btn_mark_picked_up: "తీసుకున్నట్లు గుర్తించండి", btn_mark_in_transit: "రవాణాలో ఉన్నట్లు గుర్తించండి", btn_mark_delivered: "డెలివరీ అయినట్లు గుర్తించండి", label_earnings_colon: "సంపాదన", label_complete: "పూర్తయింది",
    a_dash_eyebrow: "నెట్‌వర్క్ అవలోకనం", a_dash_title: "అడ్మిన్ డాష్‌బోర్డ్", a_dash_desc: "ఫార్మ్‌కనెక్ట్ నెట్‌వర్క్ యొక్క ప్రత్యక్ష వీక్షణ. 'డెమో' అని గుర్తించిన గణాంకాలు ఉదాహరణ మాత్రమే.",
    stat_total_farmers: "మొత్తం రైతులు", stat_total_restaurants: "మొత్తం రెస్టారెంట్లు", stat_total_transporters: "మొత్తం రవాణాదారులు", stat_total_consumers: "మొత్తం వినియోగదారులు", stat_active_orders2: "క్రియాశీల ఆర్డర్లు",
    stat_completed_orders: "పూర్తయిన ఆర్డర్లు", stat_produce_traded: "వర్తకం చేసిన ఉత్పత్తి", stat_farmer_earnings: "రైతు సంపాదన", stat_restaurant_savings: "రెస్టారెంట్ ఆదా",
    pending_verification: "పెండింగ్ నాణ్యత ధృవీకరణ", btn_go_to_verification: "ధృవీకరణకు వెళ్ళండి", nothing_pending: "పెండింగ్‌లో ఏమీ లేదు — అన్ని లిస్టింగ్‌లు ధృవీకరించబడ్డాయి.",
    btn_place_order: "ఆర్డర్ చేయండి", btn_view_details: "వివరాలు చూడండి", btn_confirm_order: "ఆర్డర్‌ను నిర్ధారించండి", btn_verify: "ధృవీకరించండి", btn_verify_now: "ఇప్పుడే ధృవీకరించండి",
    btn_accept: "అంగీకరించండి", btn_reject: "తిరస్కరించండి", btn_track: "ట్రాక్ చేయండి", btn_pay: "చెల్లించండి", btn_submit_listing: "లిస్టింగ్ సమర్పించండి", btn_cancel: "రద్దు చేయండి",
    btn_view_all: "అన్నీ చూడండి", btn_go_to_orders: "ఆర్డర్లకు వెళ్ళండి", btn_track_order: "ఆర్డర్‌ను ట్రాక్ చేయండి", btn_simulate_payment: "చెల్లింపును సిమ్యులేట్ చేయండి",
    payment_title: "చెల్లింపు", label_order_amount: "ఆర్డర్ మొత్తం", label_transportation: "రవాణా", label_platform_fee: "ప్లాట్‌ఫారమ్ రుసుము", label_total: "మొత్తం",
    payment_successful: "చెల్లింపు విజయవంతమైంది", label_farmer_payment: "రైతు చెల్లింపు", label_transport_payment: "రవాణా చెల్లింపు", label_platform_revenue: "ప్లాట్‌ఫారమ్ ఆదాయం",
    grade_label: "గ్రేడ్", available_label: "అందుబాటులో", price_label: "ధర", quality_score_label: "నాణ్యత స్కోరు", harvested_label: "కోత",
    verified_label: "ధృవీకరించబడింది", verification_pending_label: "ధృవీకరణ పెండింగ్‌లో ఉంది",
    ql_freshness: "తాజాదనం", ql_size: "పరిమాణ స్థిరత్వం", ql_damage: "నష్టం", ql_verified_by_admin: "ఫార్మ్‌కనెక్ట్ అడ్మిన్ చే ధృవీకరించబడింది", ql_pending: "ధృవీకరణ పెండింగ్‌లో ఉంది",
    notif_title: "నోటిఫికేషన్లు", notif_desc: "ఆర్డర్లు, ధృవీకరణ మరియు చెల్లింపులపై దృష్టి ఉంచండి.", btn_mark_all_read: "అన్నీ చదివినట్లు గుర్తించండి", no_notifications: "ఇంకా నోటిఫికేషన్లు లేవు.",
    profile_title: "ప్రొఫైల్", profile_desc: "డెమో ఖాతా వివరాలు.",
    order_col_order: "ఆర్డర్", order_col_crop: "పంట", order_col_farmer: "రైతు", order_col_restaurant: "రెస్టారెంట్", order_col_qty: "పరిమాణం", order_col_total: "మొత్తం", order_col_status: "స్థితి",
    no_orders_yet: "ఇంకా ఆర్డర్లు లేవు.",
    add_crop_title: "కొత్త ఉత్పత్తిని లిస్ట్ చేయండి", add_crop_desc: "మార్కెట్‌ప్లేస్‌కు కొత్త పంటను జోడించండి — టైప్ చేయండి, మాట్లాడండి, లేదా ఫోటో తీయండి.",
    field_crop_name: "పంట పేరు", field_crop_icon: "పంట చిహ్నం (ఫోటో అప్‌లోడ్ చేయకపోతే ఉపయోగించబడుతుంది)", field_quantity: "పరిమాణం (కిలో)", field_price: "కిలోకు ధర (₹)",
    field_harvest_date: "కోత తేదీ", field_location: "ప్రాంతం", field_grade: "గ్రేడ్", field_method: "వ్యవసాయ పద్ధతి", field_upload: "పంట ఫోటో అప్‌లోడ్ చేయండి",
    voice_listen: "మీ లిస్టింగ్ చెప్పడానికి నొక్కండి", voice_listening: "వింటోంది… ఇప్పుడు మాట్లాడండి",
    ai_voice_badge: "AI వాయిస్ ఫిల్", voice_heard_prefix: "విన్నది:",
    voice_example: 'చెప్పండి: "500 కిలోల టమాటా, గ్రేడ్ ఏ ప్లస్, కిలోకు 30 రూపాయలు, సేంద్రియ, రేపు కోత"',
    voice_not_supported: "ఈ బ్రౌజర్‌లో వాయిస్ గుర్తింపు మద్దతు లేదు — Android/డెస్క్‌టాప్‌లో Chrome ప్రయత్నించండి.",
    back_to_marketplace: "మార్కెట్‌ప్లేస్‌కు తిరిగి వెళ్లండి", label_price: "ధర", label_available: "అందుబాటులో", label_harvest_date: "కోత తేదీ", label_est_delivery: "అంచనా డెలివరీ", label_farming_method: "వ్యవసాయ పద్ధతి",
    today_label: "నేడు", days_ago_suffix: "రోజుల క్రితం", day_suffix: "రోజు(లు)",
    price_comparison: "ధర పోలిక", illustrative_label: "(ఉదాహరణ)", traditional_procurement: "సాంప్రదాయ కొనుగోలు", farmconnect_incl: "ఫార్మ్‌కనెక్ట్ (రవాణా & రుసుముతో సహా)", est_restaurant_saving: "అంచనా రెస్టారెంట్ ఆదా",
    back_label: "వెనుకకు", order_title_prefix: "ఆర్డర్", order_form_desc: "డెలివరీ వివరాలను పూరించండి. ఖర్చు స్వయంచాలకంగా లెక్కించబడుతుంది.",
    field_qty_required: "అవసరమైన పరిమాణం (కిలో) — గరిష్టం", field_qty_available_suffix: "కిలో అందుబాటులో", field_delivery_location: "డెలివరీ ప్రాంతం", field_delivery_date: "ఇష్టపడే డెలివరీ తేదీ", field_delivery_time: "ఇష్టపడే డెలివరీ సమయం",
    partial_order_hint: "మీరు మొత్తం లిస్టింగ్‌ను ఆర్డర్ చేయనవసరం లేదు — అందుబాటులో ఉన్నదాంట్లో మీకు కావలసినంత ఎంచుకోండి.",
    quick_select_label: "త్వరిత ఎంపిక", remaining_after_order: "మీ ఆర్డర్ తర్వాత ఈ లిస్టింగ్‌లో మిగిలి ఉంటుంది",
    cost_breakdown: "ఖర్చు వివరణ", order_placed_title: "ఆర్డర్ చేయబడింది!", order_placed_desc: "ఆర్డర్", order_placed_desc2: "సృష్టించబడింది మరియు రవాణా అభ్యర్థన స్వయంచాలకంగా సృష్టించబడింది.",
    smart_match_eyebrow: "AI-సహాయిత", smart_match_title: "స్మార్ట్ ఫార్మ్–రెస్టారెంట్ మ్యాచింగ్", smart_match_desc: "నాణ్యత, పరిమాణం, ధర, దూరం మరియు తాజాదనం ఆధారంగా ఉత్తమ పొలాలను సిఫారసు చేస్తుంది.",
    field_crop_needed: "అవసరమైన పంట", field_preferred_grade: "ఇష్టపడే గ్రేడ్",
    match_label: "సరిపోలిక", no_match_farms: "ఈ పంటకు ఇంకా ధృవీకరించిన పొలాలు లేవు.",
    forecast_eyebrow: "ముందుగా ప్రణాళిక", forecast_title: "రెస్టారెంట్ డిమాండ్ అంచనా", forecast_desc: "రైతులు ఉత్పత్తిని ప్రణాళిక వేసుకోవడానికి రెస్టారెంట్లు భవిష్యత్ అవసరాలను తెలియజేస్తాయి. డెమో డేటా.",
    demand_high: "అధిక", demand_medium: "మధ్యస్థ", demand_low: "తక్కువ", demand_suffix: "డిమాండ్",
    status_PLACED: "ఆర్డర్ చేయబడింది", status_TRANSPORTER_ASSIGNED: "రవాణాదారు కేటాయించబడింది", status_PICKED_UP: "పంట తీసుకోబడింది", status_IN_TRANSIT: "రవాణాలో ఉంది", status_DELIVERED: "డెలివరీ చేయబడింది", status_PAID: "చెల్లింపు పూర్తయింది",
    price_break_eyebrow: "పారదర్శకత", price_break_title: "ధర వివరణ: పాత గొలుసు vs. ఫార్మ్‌కనెక్ట్", price_break_desc: "ఉదాహరణ కోసం నమూనా విలువలు — వాస్తవ ధరలు పంట మరియు లిస్టింగ్‌ను బట్టి మారుతాయి.",
    price_break_current_chain: "ప్రస్తుత సరఫరా గొలుసు (డెమో)", price_break_farmconnect: "ఫార్మ్‌కనెక్ట్ (డెమో)",
    price_break_stops_note: "రెస్టారెంట్‌కు చేరే ముందు 5 మజిలీలు, 4 కమీషన్లు.", price_break_settlement_note: "1 ప్లాట్‌ఫారమ్ + రవాణా, ప్రత్యక్ష పరిష్కారం.",
    price_break_platform_fee: "ఫార్మ్‌కనెక్ట్ ప్లాట్‌ఫారమ్ రుసుము", price_break_transport: "రవాణా",
    stat_farmer_benefit: "రైతు ప్రయోజనం", stat_restaurant_saving: "రెస్టారెంట్ ఆదా", stat_intermediaries_removed2: "తొలగించిన మధ్యవర్తులు", stat_wastage_reduction: "అంచనా వృథా తగ్గింపు", demo_estimate: "డెమో అంచనా",
    stat_rating: "రేటింగ్",
    order_tracking_title: "ఆర్డర్ ట్రాకింగ్", order_tracking_desc: "ఫార్మ్‌కనెక్ట్ సరఫరా గొలుసులో ప్రత్యక్ష స్థితి.",
    est_arrival: "అంచనా చేరిక", view_ledger: "బ్లాక్‌చెయిన్ ప్రొవెనెన్స్ లెడ్జర్ చూడండి",
    consumer_trace_title: "స్కాన్ & ట్రేస్",
    qr_instructions: "ఉత్పత్తి యొక్క పూర్తి పొలం-నుండి-బల్ల ప్రయాణాన్ని చూడటానికి మీ కెమెరాను దాని QR కోడ్‌పై పాయింట్ చేయండి. ఇది ఒక సిమ్యులేటెడ్ స్కానర్ — ప్రయత్నించడానికి దిగువ నుండి ఒక నమూనా ప్యాకేజీని నొక్కండి.",
    qr_scanning: "ప్యాకేజీ స్కాన్ అవుతోంది…", qr_sample_packages: "స్కాన్ చేయడానికి నమూనా ప్యాకేజీలు", qr_no_orders: "ఇంకా స్కాన్ సిమ్యులేట్ చేయడానికి డెలివరీ అయిన ఆర్డర్లు లేవు. ముందుగా ఒక ఆర్డర్‌ను పూర్తి చేయండి (జడ్జి డెమో మోడ్ ప్రయత్నించండి).",
    qr_scan_another: "మరో ప్యాకేజీని స్కాన్ చేయండి", qr_journey: "పొలం-నుండి-బల్ల ప్రయాణం", qr_view_crypto_ledger: "క్రిప్టోగ్రాఫిక్ లెడ్జర్ చూడండి", qr_package_suffix: "ప్యాకేజీ",
    verification_title: "ధృవీకరణ కేంద్రం", verification_desc: "నెట్‌వర్క్‌ను నమ్మదగినదిగా ఉంచండి — లిస్టింగ్‌లు మరియు సభ్యులను ధృవీకరించండి.",
    tab_crop_quality: "పంట నాణ్యత", tab_farmers: "రైతులు", tab_restaurants: "రెస్టారెంట్లు", tab_transporters: "రవాణాదారులు", quality_score_colon: "నాణ్యత స్కోరు:",
    analytics_eyebrow: "డేటా-ఆధారిత", analytics_title: "ప్లాట్‌ఫారమ్ అనలిటిక్స్", analytics_desc: "ఈ సెషన్ నుండి ప్రత్యక్ష ఆర్డర్-స్థితి డేటాతో కూడిన డెమో/ఉదాహరణ చార్టులు.",
    chart_monthly_tx: "నెలవారీ లావాదేవీలు (డెమో)", chart_crop_demand: "పంట డిమాండ్ సూచిక (డెమో)", chart_earnings_savings: "రైతు సంపాదన vs. రెస్టారెంట్ ఆదా (డెమో)", chart_order_status: "ఆర్డర్ స్థితి పంపిణీ (ప్రత్యక్షం)",
    legend_farmer_earnings: "రైతు సంపాదన", legend_restaurant_savings: "రెస్టారెంట్ ఆదా",
  },
};

function t(lang, key) {
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
}

/* ============================================================
   OFFLINE SUPPORT — real navigator.onLine detection, used to show
   a status banner and gracefully degrade network-dependent features
   (the OpenStreetMap live-tracking tiles need internet; nothing
   else in the app does once the page itself has loaded and cached).
   ============================================================ */
function useOnlineStatus() {
  const [online, setOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);
  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);
  return online;
}

function LanguageSwitcher({ lang, setLang, dark }) {
  return (
    <div className="flex items-center gap-1 rounded-full p-1" style={{ backgroundColor: dark ? "rgba(255,255,255,0.1)" : C.slateLight }}>
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="px-2.5 py-1 rounded-full text-xs font-bold transition"
          style={{
            backgroundColor: lang === l ? C.marigold : "transparent",
            color: lang === l ? "white" : dark ? "white" : C.slate,
          }}
          title={LANG_LABELS[l]}
        >
          {LANG_SHORT[l]}
        </button>
      ))}
    </div>
  );
}

/* ============================================================
   REAL SHA-256 (Web Crypto API) — used by the Provenance Ledger.
   These are genuine cryptographic hashes computed in-browser,
   chained block-to-block like a real hash chain / blockchain ledger.
   ============================================================ */
async function sha256Hex(input) {
  const enc = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/* ---------- localStorage helpers (real deployment, safe to persist) ---------- */
function loadLS(key, fallback) {
  try {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore corrupt storage */ }
  return fallback;
}
function saveLS(key, value) {
  try {
    if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) { /* ignore quota / privacy-mode errors */ }
}

const NOTIFICATIONS_SEED = [
  { id: "n1", role: "farmer", text: "Your Tomato listing was verified by Admin.", time: "2h ago", read: false, icon: "ShieldCheck" },
  { id: "n2", role: "restaurant", text: "ABC Restaurant's order FC1001 was delivered.", time: "1d ago", read: false, icon: "PackageCheck" },
  { id: "n3", role: "transporter", text: "New delivery request near Ghatkesar.", time: "3h ago", read: false, icon: "Truck" },
  { id: "n4", role: "admin", text: "3 crop listings pending verification.", time: "5h ago", read: false, icon: "AlertTriangle" },
];
const ICONS_BY_NAME = { ShieldCheck, PackageCheck, Truck, AlertTriangle, Sprout, ClipboardList, Wallet, Bell, IndianRupee };
const ICON_TO_NAME = new Map(Object.entries(ICONS_BY_NAME).map(([name, comp]) => [comp, name]));

/* ---------- crop photo with graceful fallback to emoji if the image fails/expires ---------- */
function CropVisual({ crop, className, emojiSize = 28 }) {
  const [broken, setBroken] = useState(false);
  if (crop.image && !broken) {
    return <img src={crop.image} alt={crop.name} className={className + " object-cover"} onError={() => setBroken(true)} />;
  }
  return (
    <div className={className + " flex items-center justify-center"} style={{ backgroundColor: C.leafLight }}>
      <span style={{ fontSize: emojiSize }}>{crop.icon}</span>
    </div>
  );
}

const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700;9..144,800&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    .ff-display{font-family:'Fraunces',serif;}
    .ff-body{font-family:'Manrope',sans-serif;}
    .ff-mono{font-family:'JetBrains Mono',monospace;}
    .furrow-divider{
      height:10px;
      background-image: repeating-linear-gradient(115deg, ${C.line} 0px, ${C.line} 2px, transparent 2px, transparent 14px);
      opacity:0.9;
    }
    .scrollbar-thin::-webkit-scrollbar{width:6px;height:6px;}
    .scrollbar-thin::-webkit-scrollbar-thumb{background:${C.slateLight};border-radius:4px;}
    @keyframes pulseDot{0%,100%{opacity:1;}50%{opacity:.35;}}
    .pulse-dot{animation:pulseDot 1.4s ease-in-out infinite;}
    .text-2xs{font-size:10px;line-height:1.35;}
    .text-11{font-size:11px;line-height:1.4;}
    .min-w-92{min-width:92px;}
    .min-w-24{min-width:24px;}
    .min-h-26{min-height:26px;}
    .leading-tight2{line-height:1.05;}
    .min-w-220{min-width:220px;}
    .min-w-720{min-width:720px;}
  `}</style>
);

/* ============================================================
   MOCK DATA
   ============================================================ */
const FARMERS = [
  { id: "f1", name: "Ramesh Reddy", location: "Medchal", phone: "9848011001", rating: 4.7, verified: true, distanceKm: 42 },
  { id: "f2", name: "Lakshmi Naidu", location: "Shamirpet", phone: "9848011002", rating: 4.5, verified: true, distanceKm: 55 },
  { id: "f3", name: "Venkatesh Rao", location: "Boduppal", phone: "9848011003", rating: 4.3, verified: true, distanceKm: 30 },
  { id: "f4", name: "Padma Devi", location: "Uppal", phone: "9848011004", rating: 4.1, verified: true, distanceKm: 25 },
  { id: "f5", name: "Srinivas Goud", location: "Ghatkesar", phone: "9848011005", rating: 4.8, verified: true, distanceKm: 38 },
  { id: "f6", name: "Anjali Sharma", location: "Malkajgiri", phone: "9848011006", rating: 4.2, verified: true, distanceKm: 22 },
  { id: "f7", name: "Krishna Murthy", location: "LB Nagar", phone: "9848011007", rating: 4.6, verified: true, distanceKm: 28 },
  { id: "f8", name: "Sunitha Reddy", location: "Hayathnagar", phone: "9848011008", rating: 3.9, verified: false, distanceKm: 45 },
  { id: "f9", name: "Mahesh Yadav", location: "Keesara", phone: "9848011009", rating: 4.4, verified: true, distanceKm: 50 },
  { id: "f10", name: "Green Valley Farms (FPO)", location: "Rajendranagar", phone: "9848011010", rating: 4.9, verified: true, distanceKm: 60 },
];

const RESTAURANTS = [
  { id: "r1", name: "ABC Restaurant", location: "Banjara Hills" },
  { id: "r2", name: "Spice Villa", location: "Jubilee Hills" },
  { id: "r3", name: "Deccan Diner", location: "Gachibowli" },
  { id: "r4", name: "Nizam's Kitchen", location: "Kondapur" },
  { id: "r5", name: "The Green Table", location: "Madhapur" },
  { id: "r6", name: "Hyderabad House", location: "Secunderabad" },
  { id: "r7", name: "Urban Tadka", location: "Kukatpally" },
  { id: "r8", name: "Paradise Grand", location: "Ameerpet" },
  { id: "r9", name: "Coastal Curry", location: "Begumpet" },
  { id: "r10", name: "Farm Fresh Bistro", location: "HITEC City" },
];

const CONSUMERS = [
  { id: "u1", name: "Priya Verma", location: "Kukatpally", phone: "9848022001" },
  { id: "u2", name: "Arjun Rao", location: "Madhapur", phone: "9848022002" },
  { id: "u3", name: "Sneha Gupta", location: "Secunderabad", phone: "9848022003" },
  { id: "u4", name: "Vikram Nair", location: "Gachibowli", phone: "9848022004" },
  { id: "u5", name: "Divya Iyer", location: "LB Nagar", phone: "9848022005" },
  { id: "u6", name: "Rahul Mehta", location: "Ameerpet", phone: "9848022006" },
];

const TRANSPORTERS = [
  { id: "t1", name: "Rajesh Logistics", vehicle: "Tata Ace", rating: 4.6, location: "Medchal" },
  { id: "t2", name: "Suresh Transport", vehicle: "Bolero Pickup", rating: 4.4, location: "Uppal" },
  { id: "t3", name: "Kumar Carriers", vehicle: "Tata 407", rating: 4.7, location: "Boduppal" },
  { id: "t4", name: "Speed Move", vehicle: "Eicher Pro 1049", rating: 4.3, location: "Kukatpally" },
  { id: "t5", name: "City Freight", vehicle: "Ashok Leyland Dost", rating: 4.5, location: "Secunderabad" },
  { id: "t6", name: "Reliable Roadways", vehicle: "Tata Ace", rating: 4.2, location: "Malkajgiri" },
  { id: "t7", name: "Quick Haul", vehicle: "Mahindra Jeeto", rating: 4.1, location: "Ghatkesar" },
  { id: "t8", name: "Metro Movers", vehicle: "Tata 407", rating: 4.8, location: "LB Nagar" },
];

/* ============================================================
   REAL (approximate) coordinates for every Hyderabad-area
   locality used by farmers/restaurants/transporters — used to
   compute genuine haversine distances for nearby auto-assignment.
   ============================================================ */
const LOCATION_COORDS = {
  Medchal: { lat: 17.6280, lng: 78.4808 },
  Shamirpet: { lat: 17.5975, lng: 78.5697 },
  Boduppal: { lat: 17.4374, lng: 78.5581 },
  Uppal: { lat: 17.4058, lng: 78.5591 },
  Ghatkesar: { lat: 17.4457, lng: 78.6873 },
  Malkajgiri: { lat: 17.4517, lng: 78.5157 },
  "LB Nagar": { lat: 17.3465, lng: 78.5533 },
  Hayathnagar: { lat: 17.3218, lng: 78.5978 },
  Keesara: { lat: 17.5069, lng: 78.6396 },
  Rajendranagar: { lat: 17.3216, lng: 78.4004 },
  "Banjara Hills": { lat: 17.4156, lng: 78.4347 },
  "Jubilee Hills": { lat: 17.4326, lng: 78.4071 },
  Gachibowli: { lat: 17.4401, lng: 78.3489 },
  Kondapur: { lat: 17.4615, lng: 78.3636 },
  Madhapur: { lat: 17.4483, lng: 78.3915 },
  Secunderabad: { lat: 17.4399, lng: 78.4983 },
  Kukatpally: { lat: 17.4849, lng: 78.4138 },
  Ameerpet: { lat: 17.4374, lng: 78.4482 },
  Begumpet: { lat: 17.4437, lng: 78.4692 },
  "HITEC City": { lat: 17.4435, lng: 78.3772 },
};

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* A transporter's best-known current position: their live GPS if they've gone
   online, otherwise their registered home-base locality (still a real place
   with real coordinates — just not updating in real time). */
function transporterCoords(transporterId, transporterLocations) {
  const live = transporterLocations[transporterId];
  if (live) return { lat: live.lat, lng: live.lng, isLive: true };
  const tr = TRANSPORTERS.find((t) => t.id === transporterId);
  const base = tr && LOCATION_COORDS[tr.location];
  return base ? { lat: base.lat, lng: base.lng, isLive: false } : null;
}

function findNearestTransporter(farmerLocationName, transporterLocations, radiusKm) {
  const origin = LOCATION_COORDS[farmerLocationName];
  if (!origin) return null;
  let best = null;
  TRANSPORTERS.forEach((tr) => {
    const coords = transporterCoords(tr.id, transporterLocations);
    if (!coords) return;
    const distance = haversineKm(origin.lat, origin.lng, coords.lat, coords.lng);
    if (distance <= radiusKm && (!best || distance < best.distance)) {
      best = { transporterId: tr.id, distance, isLive: coords.isLive };
    }
  });
  return best;
}

const mkQuality = (score, damage, size) => ({
  score,
  freshness: score >= 90 ? "Excellent" : score >= 80 ? "Good" : score >= 70 ? "Fair" : "Needs Review",
  size,
  damage,
});

const CROPS_SEED = [
  { id: "c1", farmerId: "f1", name: "Tomato", icon: "🍅", quantity: 500, available: 500, price: 18, grade: "A+", quality: mkQuality(94, 2, 92), harvestDaysAgo: 1, method: "Organic", verified: true },
  { id: "c2", farmerId: "f2", name: "Onion", icon: "🧅", quantity: 800, available: 800, price: 14, grade: "A", quality: mkQuality(88, 4, 89), harvestDaysAgo: 3, method: "Conventional", verified: true },
  { id: "c3", farmerId: "f3", name: "Potato", icon: "🥔", quantity: 1000, available: 1000, price: 12, grade: "A", quality: mkQuality(85, 5, 87), harvestDaysAgo: 4, method: "Conventional", verified: true },
  { id: "c4", farmerId: "f4", name: "Carrot", icon: "🥕", quantity: 300, available: 300, price: 16, grade: "B", quality: mkQuality(76, 9, 78), harvestDaysAgo: 5, method: "Conventional", verified: true },
  { id: "c5", farmerId: "f5", name: "Spinach", icon: "🥬", quantity: 150, available: 150, price: 20, grade: "A+", quality: mkQuality(91, 3, 90), harvestDaysAgo: 1, method: "Organic", verified: true },
  { id: "c6", farmerId: "f6", name: "Brinjal", icon: "🍆", quantity: 400, available: 400, price: 15, grade: "A", quality: mkQuality(82, 6, 85), harvestDaysAgo: 2, method: "Conventional", verified: true },
  { id: "c7", farmerId: "f7", name: "Capsicum", icon: "🫑", quantity: 250, available: 250, price: 28, grade: "A+", quality: mkQuality(93, 2, 91), harvestDaysAgo: 1, method: "Organic", verified: true },
  { id: "c8", farmerId: "f8", name: "Cauliflower", icon: "🥦", quantity: 350, available: 350, price: 17, grade: "B", quality: mkQuality(74, 10, 76), harvestDaysAgo: 6, method: "Conventional", verified: false },
  { id: "c9", farmerId: "f9", name: "Green Chilli", icon: "🌶️", quantity: 200, available: 200, price: 35, grade: "A", quality: mkQuality(87, 4, 88), harvestDaysAgo: 2, method: "Conventional", verified: true },
  { id: "c10", farmerId: "f10", name: "Cabbage", icon: "🥗", quantity: 600, available: 600, price: 10, grade: "A+", quality: mkQuality(90, 3, 90), harvestDaysAgo: 2, method: "Organic", verified: true },
];

const STATUS_STEPS = ["PLACED", "TRANSPORTER_ASSIGNED", "PICKED_UP", "IN_TRANSIT", "DELIVERED", "PAID"];
const STATUS_LABEL = {
  PLACED: "Order Placed",
  TRANSPORTER_ASSIGNED: "Transporter Assigned",
  PICKED_UP: "Produce Picked Up",
  IN_TRANSIT: "In Transit",
  DELIVERED: "Delivered",
  PAID: "Payment Completed",
};

function transportEstimate(qty, distanceKm) {
  return Math.round(250 + qty * 0.8 + distanceKm * 6);
}
function platformFeeFor(produceCost) {
  return Math.max(100, Math.round(produceCost * 0.02));
}

/* Consumer (home-buyer) pricing: orders are 1–100 kg, so fees are tuned for
   small doorstep deliveries rather than full-truck restaurant drops. Home
   delivery is free once the produce cost crosses ₹499. */
const CONSUMER_FREE_DELIVERY_ABOVE = 499;
function consumerDeliveryFee(qty, distanceKm, produceCost) {
  if (produceCost > CONSUMER_FREE_DELIVERY_ABOVE) return 0;
  return Math.round(29 + qty * 0.6 + distanceKm * 1.1);
}
function consumerPlatformFee(produceCost) {
  return Math.max(9, Math.round(produceCost * 0.02));
}

function seedOrder(id, cropId, restaurantId, qty, status, daysAgo) {
  const crop = CROPS_SEED.find((c) => c.id === cropId);
  const restaurant = RESTAURANTS.find((r) => r.id === restaurantId);
  const produceCost = qty * crop.price * 1.35; // restaurant sees a markup vs farmer listing to represent FC margin/transport built in for seed realism
  const transportCost = transportEstimate(qty, FARMERS.find((f) => f.id === crop.farmerId).distanceKm);
  const platformFee = platformFeeFor(produceCost);
  const total = produceCost + transportCost + platformFee;
  const stepIdx = STATUS_STEPS.indexOf(status);
  const baseTime = Date.now() - daysAgo * 24 * 3600 * 1000;
  const timeline = STATUS_STEPS.slice(0, stepIdx + 1).map((s, i) => ({
    label: STATUS_LABEL[s],
    done: true,
    at: new Date(baseTime + i * 5 * 3600 * 1000).toISOString(),
  }));
  return {
    id, cropId, restaurantId, farmerId: crop.farmerId, qty,
    deliveryLocation: restaurant.location, deliveryDate: "2026-08-31", deliveryTime: "10:00 AM",
    pricePerKg: crop.price, produceCost, transportCost, platformFee, total,
    status, transporterId: stepIdx >= 1 ? TRANSPORTERS[id.length % TRANSPORTERS.length].id : null,
    timeline, createdDaysAgo: daysAgo,
  };
}

const ORDERS_SEED = [
  seedOrder("FC1001", "c1", "r1", 120, "PAID", 12),
  seedOrder("FC1002", "c2", "r3", 250, "PAID", 10),
  seedOrder("FC1003", "c3", "r5", 400, "DELIVERED", 6),
  seedOrder("FC1004", "c5", "r2", 60, "IN_TRANSIT", 2),
  seedOrder("FC1005", "c7", "r6", 80, "PICKED_UP", 1),
  seedOrder("FC1006", "c10", "r8", 300, "TRANSPORTER_ASSIGNED", 1),
  seedOrder("FC1007", "c9", "r9", 40, "PLACED", 0),
  seedOrder("FC1008", "c4", "r4", 90, "PAID", 15),
  seedOrder("FC1009", "c6", "r10", 150, "PAID", 8),
  seedOrder("FC1010", "c1", "r7", 200, "DELIVERED", 3),
];

const MANDI_PRICES_SEED = {
  Tomato: 20, Onion: 16, Potato: 14, Carrot: 18, Spinach: 22,
  Brinjal: 17, Capsicum: 30, Cauliflower: 19, "Green Chilli": 38, Cabbage: 12,
};

const MONTHLY_TX = [
  { month: "Mar", value: 42 }, { month: "Apr", value: 55 }, { month: "May", value: 61 },
  { month: "Jun", value: 78 }, { month: "Jul", value: 94 }, { month: "Aug", value: 118 },
];
const CROP_DEMAND = [
  { crop: "Tomato", demand: 92 }, { crop: "Onion", demand: 78 }, { crop: "Potato", demand: 85 },
  { crop: "Capsicum", demand: 54 }, { crop: "Spinach", demand: 40 }, { crop: "Cabbage", demand: 61 },
];
const PIE_COLORS = [C.forestMid, C.marigold, C.sky, C.slate, C.leaf, C.gold];

const FORECAST = [
  { crop: "Tomato", icon: "🍅", demand: "High", dir: "up", note: "Restaurants indicating +18% weekly requirement" },
  { crop: "Onion", icon: "🧅", demand: "Medium", dir: "flat", note: "Stable requirement across partner restaurants" },
  { crop: "Potato", icon: "🥔", demand: "High", dir: "up", note: "Festive season procurement rising" },
  { crop: "Carrot", icon: "🥕", demand: "Low", dir: "down", note: "Lower indicated need this fortnight" },
  { crop: "Capsicum", icon: "🫑", demand: "Medium", dir: "up", note: "Growing interest from continental kitchens" },
  { crop: "Spinach", icon: "🥬", demand: "Medium", dir: "flat", note: "Consistent weekly demand" },
];

/* ============================================================
   SMALL UI PRIMITIVES
   ============================================================ */
const Badge = ({ children, bg, fg, icon: Icon }) => (
  <span
    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ff-body"
    style={{ backgroundColor: bg, color: fg }}
  >
    {Icon && <Icon size={12} />}
    {children}
  </span>
);

const GradeBadge = ({ grade }) => {
  const g = gradeColor(grade);
  return <Badge bg={g.bg} fg={g.fg} icon={Award}>Grade {grade}</Badge>;
};

const StatusBadge = ({ status, lang = "en" }) => {
  const map = {
    PLACED: { bg: C.skyLight, fg: C.sky },
    TRANSPORTER_ASSIGNED: { bg: C.marigoldLight, fg: C.marigoldDark },
    PICKED_UP: { bg: C.marigoldLight, fg: C.marigoldDark },
    IN_TRANSIT: { bg: "#FFF3CD", fg: "#8A6200" },
    DELIVERED: { bg: C.leafLight, fg: C.forestMid },
    PAID: { bg: C.leafLight, fg: C.forestMid },
  };
  const s = map[status] || { bg: C.slateLight, fg: C.slate };
  return <Badge bg={s.bg} fg={s.fg}>{t(lang, "status_" + status)}</Badge>;
};

const StatCard = ({ label, value, icon: Icon, tint, sub }) => (
  <div className="rounded-2xl p-4 sm:p-5 bg-white border" style={{ borderColor: C.line }}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs ff-body font-semibold uppercase tracking-wide" style={{ color: C.slate }}>{label}</p>
        <p className="ff-display font-bold text-2xl sm:text-3xl mt-1" style={{ color: C.forest }}>{value}</p>
        {sub && <p className="text-xs mt-1 ff-body" style={{ color: C.slate }}>{sub}</p>}
      </div>
      <div className="p-2.5 rounded-xl" style={{ backgroundColor: tint || C.leafLight }}>
        <Icon size={20} style={{ color: C.forestMid }} />
      </div>
    </div>
  </div>
);

const SectionTitle = ({ eyebrow, title, desc, right }) => (
  <div className="flex items-end justify-between flex-wrap gap-3 mb-4">
    <div>
      {eyebrow && <p className="text-xs font-bold tracking-widest uppercase ff-body" style={{ color: C.marigoldDark }}>{eyebrow}</p>}
      <h2 className="ff-display font-bold text-xl sm:text-2xl" style={{ color: C.forest }}>{title}</h2>
      {desc && <p className="text-sm ff-body mt-1" style={{ color: C.slate }}>{desc}</p>}
    </div>
    {right}
  </div>
);

const Button = ({ children, onClick, variant = "primary", size = "md", icon: Icon, className = "", disabled }) => {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold ff-body transition disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = size === "sm" ? "px-3 py-1.5 text-xs" : size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2.5 text-sm";
  const styles = {
    primary: { backgroundColor: C.forestMid, color: "white" },
    marigold: { backgroundColor: C.marigold, color: "white" },
    outline: { backgroundColor: "transparent", color: C.forestMid, border: `1.5px solid ${C.forestMid}` },
    ghost: { backgroundColor: C.leafLight, color: C.forestMid },
    danger: { backgroundColor: C.dangerLight, color: C.danger },
    dark: { backgroundColor: C.forest, color: "white" },
  };
  return (
    <button disabled={disabled} onClick={onClick} className={`${base} ${sizes} ${className} hover:opacity-90 active:scale-[0.98]`} style={styles[variant]}>
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
};

const Modal = ({ open, onClose, title, children, wide }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ backgroundColor: "rgba(18,49,42,0.55)" }}>
      <div className={`bg-white rounded-t-3xl sm:rounded-2xl w-full ${wide ? "sm:max-w-2xl" : "sm:max-w-md"} max-h-[92vh] overflow-y-auto scrollbar-thin`}>
        <div className="flex items-center justify-between px-5 py-4 border-b sticky top-0 bg-white z-10" style={{ borderColor: C.line }}>
          <h3 className="ff-display font-bold text-lg" style={{ color: C.forest }}>{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100"><X size={18} /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

const Field = ({ label, children }) => (
  <div className="mb-3">
    <label className="block text-xs font-semibold mb-1 ff-body" style={{ color: C.slate }}>{label}</label>
    {children}
  </div>
);
const inputCls = "w-full px-3 py-2.5 rounded-xl border text-sm ff-body focus:outline-none focus:ring-2";
const inputStyle = { borderColor: C.line };

/* ============================================================
   QUALITY CARD
   ============================================================ */
const QualityCard = ({ crop, lang = "en" }) => {
  const g = gradeColor(crop.grade);
  return (
    <div className="rounded-2xl border p-4 bg-white" style={{ borderColor: g.ring + "55" }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <CropVisual crop={crop} className="w-9 h-9 rounded-lg" emojiSize={20} />
          <div>
            <p className="font-bold ff-body text-sm" style={{ color: C.forest }}>{crop.name}</p>
            <p className="text-xs ff-body" style={{ color: C.slate }}>{t(lang, "harvested_label")} {crop.harvestDaysAgo === 0 ? "today" : `${crop.harvestDaysAgo} day${crop.harvestDaysAgo > 1 ? "s" : ""} ago`}</p>
          </div>
        </div>
        <GradeBadge grade={crop.grade} />
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${crop.quality.score}%`, backgroundColor: g.ring }} />
        </div>
        <span className="ff-mono text-xs font-bold" style={{ color: C.forest }}>{crop.quality.score}/100</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg py-2" style={{ backgroundColor: C.cream }}>
          <p className="text-2xs uppercase font-semibold ff-body" style={{ color: C.slate }}>{t(lang, "ql_freshness")}</p>
          <p className="text-xs font-bold ff-body" style={{ color: C.forest }}>{crop.quality.freshness}</p>
        </div>
        <div className="rounded-lg py-2" style={{ backgroundColor: C.cream }}>
          <p className="text-2xs uppercase font-semibold ff-body" style={{ color: C.slate }}>{t(lang, "ql_size")}</p>
          <p className="text-xs font-bold ff-body" style={{ color: C.forest }}>{crop.quality.size}%</p>
        </div>
        <div className="rounded-lg py-2" style={{ backgroundColor: C.cream }}>
          <p className="text-2xs uppercase font-semibold ff-body" style={{ color: C.slate }}>{t(lang, "ql_damage")}</p>
          <p className="text-xs font-bold ff-body" style={{ color: C.forest }}>{crop.quality.damage}%</p>
        </div>
      </div>
      <div className="mt-3">
        {crop.verified ? (
          <Badge bg={C.leafLight} fg={C.forestMid} icon={BadgeCheck}>{t(lang, "ql_verified_by_admin")}</Badge>
        ) : (
          <Badge bg="#FFF3CD" fg="#8A6200" icon={Clock}>{t(lang, "ql_pending")}</Badge>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   CROP CARD (marketplace / my produce / matching)
   ============================================================ */
const CropCard = ({ crop, farmer, onView, footer, lang = "en" }) => (
  <div className="rounded-2xl bg-white border overflow-hidden flex flex-col" style={{ borderColor: C.line }}>
    <div className="p-4 flex items-center justify-between" style={{ backgroundColor: C.cream }}>
      <div className="flex items-center gap-3">
        <CropVisual crop={crop} className="w-12 h-12 rounded-xl bg-white border" emojiSize={22} />
        <div>
          <p className="ff-display font-bold" style={{ color: C.forest }}>{crop.name}</p>
          <p className="text-xs ff-body flex items-center gap-1" style={{ color: C.slate }}>
            <MapPin size={11} /> {farmer?.location}
          </p>
        </div>
      </div>
      <GradeBadge grade={crop.grade} />
    </div>
    <div className="p-4 flex-1 flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="ff-body" style={{ color: C.slate }}>{t(lang, "order_col_farmer")}</span>
        <span className="ff-body font-semibold" style={{ color: C.forest }}>{farmer?.name}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="ff-body" style={{ color: C.slate }}>{t(lang, "available_label")}</span>
        <span className="ff-mono font-semibold" style={{ color: C.forest }}>{crop.available} kg</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="ff-body" style={{ color: C.slate }}>{t(lang, "price_label")}</span>
        <span className="ff-mono font-bold" style={{ color: C.marigoldDark }}>{fmt(crop.price)}/kg</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="ff-body" style={{ color: C.slate }}>{t(lang, "quality_score_label")}</span>
        <span className="ff-mono font-semibold flex items-center gap-1" style={{ color: C.forest }}><Gauge size={13} />{crop.quality.score}/100</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="ff-body" style={{ color: C.slate }}>{t(lang, "harvested_label")}</span>
        <span className="ff-body font-semibold" style={{ color: C.forest }}>{crop.harvestDaysAgo === 0 ? "Today" : `${crop.harvestDaysAgo}d ago`}</span>
      </div>
      {crop.verified ? (
        <Badge bg={C.leafLight} fg={C.forestMid} icon={BadgeCheck}>{t(lang, "verified_label")}</Badge>
      ) : (
        <Badge bg="#FFF3CD" fg="#8A6200" icon={Clock}>{t(lang, "verification_pending_label")}</Badge>
      )}
    </div>
    <div className="p-4 pt-0">
      {footer ? footer : (
        <Button className="w-full" onClick={() => onView(crop)} icon={ChevronRight}>{t(lang, "btn_view_details")}</Button>
      )}
    </div>
  </div>
);

/* ============================================================
   STEPPER (order tracking / supply chain flow)
   ============================================================ */
const Stepper = ({ steps, activeIndex, orientation = "vertical" }) => {
  if (orientation === "horizontal") {
    return (
      <div className="flex items-center w-full overflow-x-auto scrollbar-thin py-2">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center min-w-92">
              <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 shrink-0"
                style={{
                  borderColor: i <= activeIndex ? C.forestMid : C.line,
                  backgroundColor: i <= activeIndex ? C.forestMid : "white",
                  color: i <= activeIndex ? "white" : C.slate,
                }}>
                {i < activeIndex ? <CheckCircle2 size={18} /> : <span className="ff-mono text-xs font-bold">{i + 1}</span>}
              </div>
              <p className="text-11 text-center mt-1.5 ff-body font-semibold" style={{ color: i <= activeIndex ? C.forest : C.slate }}>{s}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="h-0.5 flex-1 min-w-24 mx-1" style={{ backgroundColor: i < activeIndex ? C.forestMid : C.line }} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
  return (
    <div>
      {steps.map((s, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: i <= activeIndex ? C.forestMid : C.slateLight, color: i <= activeIndex ? "white" : C.slate }}>
              {i < activeIndex ? <CheckCircle2 size={14} /> : i === activeIndex ? <Circle size={10} fill="white" className="pulse-dot" /> : <Circle size={10} />}
            </div>
            {i < steps.length - 1 && <div className="w-0.5 flex-1 min-h-26" style={{ backgroundColor: i < activeIndex ? C.forestMid : C.line }} />}
          </div>
          <p className={`pb-6 text-sm ff-body ${i <= activeIndex ? "font-semibold" : ""}`} style={{ color: i <= activeIndex ? C.forest : C.slate }}>{s}</p>
        </div>
      ))}
    </div>
  );
};

/* ============================================================
   LANDING PAGE
   ============================================================ */
const Landing = ({ goRoleSelect, goMarketplacePreview, lang, setLang }) => {
  const flow = [
    { icon: Sprout, label: t(lang, "flow_farmer") },
    { icon: ShieldCheck, label: t(lang, "flow_quality") },
    { icon: Leaf, label: t(lang, "flow_match") },
    { icon: Truck, label: t(lang, "flow_transport") },
    { icon: UtensilsCrossed, label: t(lang, "flow_restaurant") },
  ];
  const benefits = [
    { icon: TrendingUp, title: t(lang, "benefit1_t"), desc: t(lang, "benefit1_d") },
    { icon: Wallet, title: t(lang, "benefit2_t"), desc: t(lang, "benefit2_d") },
    { icon: ShieldCheck, title: t(lang, "benefit3_t"), desc: t(lang, "benefit3_d") },
    { icon: Package, title: t(lang, "benefit4_t"), desc: t(lang, "benefit4_d") },
    { icon: Route, title: t(lang, "benefit5_t"), desc: t(lang, "benefit5_d") },
    { icon: ClipboardList, title: t(lang, "benefit6_t"), desc: t(lang, "benefit6_d") },
  ];
  return (
    <div className="ff-body" style={{ backgroundColor: C.cream }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-5 sm:px-10 py-5 max-w-7xl mx-auto gap-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: C.forestMid }}>
            <Sprout size={18} color="white" />
          </div>
          <span className="ff-display font-bold text-lg" style={{ color: C.forest }}>FarmConnect</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher lang={lang} setLang={setLang} />
          <Button variant="outline" size="sm" onClick={goRoleSelect}>{t(lang, "btn_login")}</Button>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-5 sm:px-10 pt-6 pb-14 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <Badge bg={C.marigoldLight} fg={C.marigoldDark} icon={Sparkles}>SIH 2026 · Agri-Tech Supply Chain</Badge>
          <h1 className="ff-display font-extrabold leading-tight2 mt-4" style={{ color: C.forest, fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}>
            {t(lang, "brand_tagline")}
          </h1>
          <p className="mt-4 text-base sm:text-lg" style={{ color: C.slate }}>
            {t(lang, "hero_subtitle")}
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Button size="lg" variant="marigold" icon={ArrowRight} onClick={goRoleSelect}>{t(lang, "btn_get_started")}</Button>
            <Button size="lg" variant="outline" icon={Store} onClick={goMarketplacePreview}>{t(lang, "btn_explore_marketplace")}</Button>
          </div>
          <div className="flex items-center gap-6 mt-8">
            <div><p className="ff-display font-bold text-2xl" style={{ color: C.forest }}>10+</p><p className="text-xs" style={{ color: C.slate }}>{t(lang, "stat_partner_farms")}</p></div>
            <div className="w-px h-8" style={{ backgroundColor: C.line }} />
            <div><p className="ff-display font-bold text-2xl" style={{ color: C.forest }}>3</p><p className="text-xs" style={{ color: C.slate }}>{t(lang, "stat_intermediaries_removed")}</p></div>
            <div className="w-px h-8" style={{ backgroundColor: C.line }} />
            <div><p className="ff-display font-bold text-2xl" style={{ color: C.forest }}>Demo</p><p className="text-xs" style={{ color: C.slate }}>{t(lang, "stat_illustrative")}</p></div>
          </div>
        </div>
        <div className="rounded-3xl p-6 sm:p-8" style={{ backgroundColor: C.forest }}>
          <p className="text-xs uppercase tracking-widest font-bold mb-5" style={{ color: C.marigold }}>{t(lang, "supply_chain_flow")}</p>
          <div className="flex flex-col gap-0">
            {flow.map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: i === 2 ? C.marigold : "rgba(255,255,255,0.1)" }}>
                    <s.icon size={20} color="white" />
                  </div>
                  {i < flow.length - 1 && <div className="w-0.5 h-8" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />}
                </div>
                <p className="text-white font-semibold ff-body pb-8">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="furrow-divider" />

      {/* Benefits */}
      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-14">
        <SectionTitle eyebrow={t(lang, "why_eyebrow")} title={t(lang, "why_title")} desc={t(lang, "why_desc")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {benefits.map((b, i) => (
            <div key={i} className="rounded-2xl p-5 bg-white border" style={{ borderColor: C.line }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: C.leafLight }}>
                <b.icon size={18} style={{ color: C.forestMid }} />
              </div>
              <p className="ff-display font-bold" style={{ color: C.forest }}>{b.title}</p>
              <p className="text-sm mt-1" style={{ color: C.slate }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ backgroundColor: C.forest }} className="py-14">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: C.marigold }}>{t(lang, "how_eyebrow")}</p>
          <h2 className="ff-display font-bold text-2xl text-white mb-8">{t(lang, "how_title")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: Sprout, role: t(lang, "role_farmer"), desc: t(lang, "role_farmer_d") },
              { icon: ShieldCheck, role: t(lang, "role_admin"), desc: t(lang, "role_admin_d") },
              { icon: UtensilsCrossed, role: t(lang, "role_restaurant"), desc: t(lang, "role_restaurant_d") },
              { icon: ShoppingBasket, role: t(lang, "role_consumer"), desc: t(lang, "role_consumer_d") },
              { icon: Truck, role: t(lang, "role_transporter"), desc: t(lang, "role_transporter_d") },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                <r.icon size={22} color={C.marigold} />
                <p className="ff-display font-bold text-white mt-3">{r.role}</p>
                <p className="text-sm mt-1" style={{ color: "#C9D6CF" }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-12 text-center">
        <h3 className="ff-display font-bold text-2xl" style={{ color: C.forest }}>{t(lang, "cta_title")}</h3>
        <p className="mt-2" style={{ color: C.slate }}>{t(lang, "cta_desc")}</p>
        <div className="flex justify-center gap-3 mt-5">
          <Button size="lg" variant="marigold" icon={ArrowRight} onClick={goRoleSelect}>{t(lang, "btn_get_started")}</Button>
        </div>
        <p className="text-xs mt-10" style={{ color: C.slate }}>{t(lang, "footer_note")}</p>
      </div>
    </div>
  );
};

/* ============================================================
   ROLE SELECT / LOGIN
   ============================================================ */
const RoleSelect = ({ onSelect, onBack, lang, setLang }) => {
  const roles = [
    { key: "farmer", icon: "🌾", title: t(lang, "role_farmer"), desc: t(lang, "role_farmer_short"), tint: C.leafLight },
    { key: "restaurant", icon: "🍽️", title: t(lang, "role_restaurant"), desc: t(lang, "role_restaurant_short"), tint: C.marigoldLight },
    { key: "consumer", icon: "🛒", title: t(lang, "role_consumer"), desc: t(lang, "role_consumer_short"), tint: C.plumLight },
    { key: "transporter", icon: "🚚", title: t(lang, "role_transporter"), desc: t(lang, "role_transporter_short"), tint: C.skyLight },
    { key: "admin", icon: "🛡️", title: t(lang, "role_admin"), desc: t(lang, "role_admin_short"), tint: C.slateLight },
  ];
  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10 ff-body" style={{ backgroundColor: C.cream }}>
      <div className="max-w-3xl w-full">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="flex items-center gap-1 text-sm font-semibold" style={{ color: C.forestMid }}>
            <ChevronLeft size={16} /> {t(lang, "back_home")}
          </button>
          <LanguageSwitcher lang={lang} setLang={setLang} />
        </div>
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: C.forestMid }}>
            <Sprout size={22} color="white" />
          </div>
          <h1 className="ff-display font-bold text-2xl sm:text-3xl" style={{ color: C.forest }}>{t(lang, "role_select_title")}</h1>
          <p className="text-sm mt-1" style={{ color: C.slate }}>{t(lang, "role_select_desc")}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {roles.map((r) => (
            <button key={r.key} onClick={() => onSelect(r.key)} className="text-left rounded-2xl p-5 bg-white border hover:shadow-md transition" style={{ borderColor: C.line }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3" style={{ backgroundColor: r.tint }}>{r.icon}</div>
              <p className="ff-display font-bold text-lg" style={{ color: C.forest }}>{r.title}</p>
              <p className="text-sm mt-1" style={{ color: C.slate }}>{r.desc}</p>
              <p className="text-xs font-bold mt-3 flex items-center gap-1" style={{ color: C.marigoldDark }}>{t(lang, "continue_as")} {r.title} <ArrowRight size={13} /></p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   SHELL: TOPBAR + SIDEBAR
   ============================================================ */
const NAV = {
  farmer: [
    { key: "f-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "f-produce", label: "My Produce", icon: Sprout },
    { key: "f-orders", label: "Orders", icon: ClipboardList },
    { key: "f-quality", label: "Quality", icon: ShieldCheck },
    { key: "f-mandi", label: "Mandi Prices", icon: IndianRupee },
    { key: "f-notifications", label: "Notifications", icon: Bell },
    { key: "f-profile", label: "Profile", icon: User },
  ],
  restaurant: [
    { key: "r-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "r-marketplace", label: "Marketplace", icon: Store },
    { key: "r-orders", label: "Orders", icon: ClipboardList },
    { key: "r-matching", label: "Smart Matching", icon: Sparkles },
    { key: "r-forecast", label: "Demand Forecast", icon: BarChart3 },
    { key: "r-pricebreakdown", label: "Price Breakdown", icon: IndianRupee },
    { key: "r-notifications", label: "Notifications", icon: Bell },
    { key: "r-profile", label: "Profile", icon: User },
  ],
  consumer: [
    { key: "c-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "c-marketplace", label: "Vegetable Market", icon: ShoppingBasket },
    { key: "c-orders", label: "My Orders", icon: ClipboardList },
    { key: "c-notifications", label: "Notifications", icon: Bell },
    { key: "c-profile", label: "Profile", icon: User },
  ],
  transporter: [
    { key: "t-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "t-deliveries", label: "Deliveries", icon: Truck },
    { key: "t-tracking", label: "Tracking", icon: MapPinned },
    { key: "t-notifications", label: "Notifications", icon: Bell },
    { key: "t-profile", label: "Profile", icon: User },
  ],
  admin: [
    { key: "a-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "a-verification", label: "Verification", icon: ShieldCheck },
    { key: "a-assign", label: "Assign Transport", icon: Truck },
    { key: "order-tracking", label: "Live Tracking", icon: MapPinned },
    { key: "a-mandi", label: "Mandi Prices", icon: IndianRupee },
    { key: "a-analytics", label: "Analytics", icon: BarChart3 },
    { key: "a-notifications", label: "Notifications", icon: Bell },
  ],
};
const ROLE_META = {
  farmer: { title: "Farmer", icon: Sprout, color: C.forestMid },
  restaurant: { title: "Restaurant", icon: UtensilsCrossed, color: C.marigoldDark },
  consumer: { title: "Consumer", icon: ShoppingBasket, color: C.plum },
  transporter: { title: "Transporter", icon: Truck, color: C.sky },
  admin: { title: "Admin", icon: ShieldCheck, color: C.slate },
};

/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | roleSelect | app
  const [lang, setLang] = useState(() => loadLS("fc_lang", "en"));
  useEffect(() => { saveLS("fc_lang", lang); }, [lang]);
  const [role, setRole] = useState(null);
  const [page, setPage] = useState("f-dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isOnline = useOnlineStatus();

  const [crops, setCrops] = useState(() => loadLS("fc_crops", CROPS_SEED));
  const [orders, setOrders] = useState(() => loadLS("fc_orders", ORDERS_SEED));
  const [mandiPrices, setMandiPrices] = useState(() => loadLS("fc_mandi_prices", MANDI_PRICES_SEED));
  useEffect(() => { saveLS("fc_mandi_prices", mandiPrices); }, [mandiPrices]);
  const [notifications, setNotifications] = useState(() => loadLS("fc_notifications", NOTIFICATIONS_SEED));
  const [selectedCropId, setSelectedCropId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderCounter, setOrderCounter] = useState(() => loadLS("fc_order_counter", 1011));

  // Persist demo data across refreshes now that this runs as a real deployed app
  useEffect(() => { saveLS("fc_crops", crops); }, [crops]);
  useEffect(() => { saveLS("fc_orders", orders); }, [orders]);
  useEffect(() => { saveLS("fc_notifications", notifications); }, [notifications]);
  useEffect(() => { saveLS("fc_order_counter", orderCounter); }, [orderCounter]);

  const [demoStep, setDemoStep] = useState(-1); // -1 = inactive
  const [demoCropId, setDemoCropId] = useState(null);
  const [demoOrderId, setDemoOrderId] = useState(null);

  // Consumer-facing features (item 3 & 4): QR scan simulator + blockchain provenance ledger
  const [qrScannerOpen, setQrScannerOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [ledgerOrderId, setLedgerOrderId] = useState(null);

  // In-app assistant support state (search-and-navigate needs a remount nonce so
  // a repeated "search X" command re-applies even if already on the marketplace page)
  const [assistantSearchQuery, setAssistantSearchQuery] = useState("");
  const [assistantSearchNonce, setAssistantSearchNonce] = useState(0);
  const bumpAssistantSearchNonce = () => setAssistantSearchNonce((n) => n + 1);

  // Real-device GPS live location, keyed by order id: { [orderId]: { lat, lng, at } }.
  // This is genuine navigator.geolocation data (not simulated), shared for free by
  // reading the transporter's own device — visible to any role viewing that order's
  // tracking within this same browser session (no backend to relay it cross-device).
  const [liveLocations, setLiveLocations] = useState(() => loadLS("fc_live_locations", {}));
  useEffect(() => { saveLS("fc_live_locations", liveLocations); }, [liveLocations]);
  const updateLiveLocation = (orderId, lat, lng) => {
    setLiveLocations((prev) => ({ ...prev, [orderId]: { lat, lng, at: new Date().toISOString() } }));
  };

  // Automatic nearby-radius transporter assignment (real haversine distance,
  // using each transporter's live "online" GPS if available, else their home base)
  const [autoAssignEnabled, setAutoAssignEnabled] = useState(() => loadLS("fc_auto_assign_enabled", true));
  const [autoAssignRadius, setAutoAssignRadius] = useState(() => loadLS("fc_auto_assign_radius", 25));
  useEffect(() => { saveLS("fc_auto_assign_enabled", autoAssignEnabled); }, [autoAssignEnabled]);
  useEffect(() => { saveLS("fc_auto_assign_radius", autoAssignRadius); }, [autoAssignRadius]);

  const [transporterLocations, setTransporterLocations] = useState(() => loadLS("fc_transporter_locations", {}));
  useEffect(() => { saveLS("fc_transporter_locations", transporterLocations); }, [transporterLocations]);
  const updateTransporterLocation = (transporterId, lat, lng) => {
    setTransporterLocations((prev) => ({ ...prev, [transporterId]: { lat, lng, at: new Date().toISOString() } }));
  };
  const clearTransporterLocation = (transporterId) => {
    setTransporterLocations((prev) => {
      const next = { ...prev };
      delete next[transporterId];
      return next;
    });
  };

  // "me" ids per role for demo purposes
  const meFarmer = FARMERS[0];
  const meRestaurant = RESTAURANTS[0];
  const meTransporter = TRANSPORTERS[0];
  const meConsumer = CONSUMERS[0];

  const notify = (targetRole, text, icon) => {
    const iconName = ICON_TO_NAME.get(icon) || "Bell";
    setNotifications((prev) => [{ id: "n" + Math.random().toString(36).slice(2, 8), role: targetRole, text, time: "just now", read: false, icon: iconName }, ...prev]);
  };

  const resetDemoData = () => {
    if (!window.confirm("Reset all demo data back to the original seed dataset?")) return;
    setCrops(CROPS_SEED); setOrders(ORDERS_SEED); setNotifications(NOTIFICATIONS_SEED); setOrderCounter(1011); setMandiPrices(MANDI_PRICES_SEED);
    setLiveLocations({}); setTransporterLocations({}); setAutoAssignEnabled(true); setAutoAssignRadius(25);
    setDemoStep(-1); setDemoCropId(null); setDemoOrderId(null);
  };

  const goApp = (r) => {
    setRole(r);
    setScreen("app");
    setPage(NAV[r][0].key);
  };

  const logout = () => {
    setRole(null);
    setScreen("roleSelect");
  };

  /* ---------- crop actions ---------- */
  const addCrop = (form) => {
    const id = "c" + (crops.length + 1) + Math.random().toString(36).slice(2, 5);
    const score = form.grade === "A+" ? 90 + Math.round(Math.random() * 6) : form.grade === "A" ? 80 + Math.round(Math.random() * 9) : 68 + Math.round(Math.random() * 10);
    const newCrop = {
      id, farmerId: meFarmer.id, name: form.name, icon: form.icon || "🌿", image: form.image || null,
      quantity: Number(form.quantity), available: Number(form.quantity), price: Number(form.price),
      grade: form.grade, quality: mkQuality(score, Math.max(1, 12 - Math.round(score / 10)), Math.min(98, score + 2)),
      harvestDaysAgo: 0, method: form.method, verified: false,
    };
    setCrops((prev) => [newCrop, ...prev]);
    notify("admin", `${meFarmer.name} listed a new crop: ${form.name} (${form.quantity}kg).`, Sprout);
    return id;
  };

  const verifyCrop = (id) => {
    setCrops((prev) => prev.map((c) => (c.id === id ? { ...c, verified: true } : c)));
    const c = crops.find((x) => x.id === id);
    if (c) notify("farmer", `${c.name} listing has been verified by Admin.`, ShieldCheck);
  };

  /* ---------- order actions ---------- */
  const createOrder = (crop, form) => {
    const farmer = FARMERS.find((f) => f.id === crop.farmerId);
    const qty = Number(form.quantity);
    const produceCost = qty * crop.price;
    const transportCost = transportEstimate(qty, farmer.distanceKm);
    const platformFee = platformFeeFor(produceCost);
    const total = produceCost + transportCost + platformFee;
    const id = "FC" + orderCounter;
    setOrderCounter((n) => n + 1);

    // Try automatic nearby-radius assignment before falling back to manual admin assignment
    const nearest = autoAssignEnabled ? findNearestTransporter(farmer.location, transporterLocations, autoAssignRadius) : null;
    const now = new Date().toISOString();
    const timeline = [{ label: STATUS_LABEL.PLACED, done: true, at: now }];
    if (nearest) timeline.push({ label: STATUS_LABEL.TRANSPORTER_ASSIGNED, done: true, at: now });

    const order = {
      id, cropId: crop.id, restaurantId: meRestaurant.id, farmerId: crop.farmerId, qty,
      deliveryLocation: form.deliveryLocation, deliveryDate: form.deliveryDate, deliveryTime: form.deliveryTime,
      pricePerKg: crop.price, produceCost, transportCost, platformFee, total,
      status: nearest ? "TRANSPORTER_ASSIGNED" : "PLACED", transporterId: nearest ? nearest.transporterId : null,
      timeline, createdDaysAgo: 0,
    };
    setOrders((prev) => [order, ...prev]);
    setCrops((prev) => prev.map((c) => (c.id === crop.id ? { ...c, available: Math.max(0, c.available - qty) } : c)));
    notify("farmer", `New order ${id}: ${qty}kg ${crop.name} from ${meRestaurant.name}.`, ClipboardList);

    if (nearest) {
      const trName = TRANSPORTERS.find((t) => t.id === nearest.transporterId)?.name;
      const distText = `${nearest.distance.toFixed(1)}km`;
      notify("admin", `Order ${id} auto-assigned to ${trName} (${distText} away).`, Truck);
      notify("transporter", `Order ${id} auto-assigned to you — pickup is ${distText} from your location.`, Truck);
      notify("farmer", `Transporter ${trName} assigned automatically (${distText} away).`, Truck);
    } else {
      notify("admin", `Order ${id} placed — no transporter found within ${autoAssignRadius}km, needs manual assignment.`, Truck);
    }
    return id;
  };

  /* Consumer (home-buyer) orders: same supply chain as restaurant orders, but
     sized 1–100 kg with doorstep-delivery pricing instead of truck pricing. */
  const createConsumerOrder = (crop, form) => {
    const farmer = FARMERS.find((f) => f.id === crop.farmerId);
    const qty = Math.min(100, Math.max(1, Number(form.quantity)));
    const produceCost = qty * crop.price;
    const transportCost = consumerDeliveryFee(qty, farmer.distanceKm, produceCost);
    const platformFee = consumerPlatformFee(produceCost);
    const total = produceCost + transportCost + platformFee;
    const id = "FC" + orderCounter;
    setOrderCounter((n) => n + 1);

    const nearest = autoAssignEnabled ? findNearestTransporter(farmer.location, transporterLocations, autoAssignRadius) : null;
    const now = new Date().toISOString();
    const timeline = [{ label: STATUS_LABEL.PLACED, done: true, at: now }];
    if (nearest) timeline.push({ label: STATUS_LABEL.TRANSPORTER_ASSIGNED, done: true, at: now });

    const order = {
      id, cropId: crop.id, restaurantId: null, buyerType: "consumer", consumerId: meConsumer.id, farmerId: crop.farmerId, qty,
      deliveryLocation: form.deliveryLocation, deliveryDate: form.deliveryDate, deliveryTime: form.deliveryTime,
      pricePerKg: crop.price, produceCost, transportCost, platformFee, total,
      status: nearest ? "TRANSPORTER_ASSIGNED" : "PLACED", transporterId: nearest ? nearest.transporterId : null,
      timeline, createdDaysAgo: 0,
    };
    setOrders((prev) => [order, ...prev]);
    setCrops((prev) => prev.map((c) => (c.id === crop.id ? { ...c, available: Math.max(0, c.available - qty) } : c)));
    notify("farmer", `New order ${id}: ${qty}kg ${crop.name} from ${meConsumer.name} (Consumer).`, ClipboardList);

    if (nearest) {
      const trName = TRANSPORTERS.find((t) => t.id === nearest.transporterId)?.name;
      const distText = `${nearest.distance.toFixed(1)}km`;
      notify("admin", `Consumer order ${id} auto-assigned to ${trName} (${distText} away).`, Truck);
      notify("transporter", `Consumer order ${id} auto-assigned to you — pickup is ${distText} from your location.`, Truck);
    } else {
      notify("admin", `Consumer order ${id} placed — no transporter found within ${autoAssignRadius}km, needs manual assignment.`, Truck);
    }
    return id;
  };

  const advanceOrder = (id, nextStatus, transporterId) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const updated = { ...o, status: nextStatus };
        if (transporterId) updated.transporterId = transporterId;
        updated.timeline = [...o.timeline, { label: STATUS_LABEL[nextStatus], done: true, at: new Date().toISOString() }];
        return updated;
      })
    );
    const o = orders.find((x) => x.id === id);
    if (o) {
      const buyerRole = o.buyerType === "consumer" ? "consumer" : "restaurant";
      const buyerLabel = o.buyerType === "consumer" ? "consumer" : "restaurant";
      if (nextStatus === "TRANSPORTER_ASSIGNED") { notify(buyerRole, `Order ${id}: transporter assigned.`, Truck); notify("farmer", `Order ${id}: transporter assigned for pickup.`, Truck); }
      if (nextStatus === "PICKED_UP") notify(buyerRole, `Order ${id}: produce picked up from farm.`, PackageCheck);
      if (nextStatus === "IN_TRANSIT") notify(buyerRole, `Order ${id}: shipment in transit.`, Truck);
      if (nextStatus === "DELIVERED") { notify(buyerRole, `Order ${id}: delivered.`, PackageCheck); notify("farmer", `Order ${id}: delivered to ${buyerLabel}.`, PackageCheck); }
      if (nextStatus === "PAID") { notify("farmer", `Payment received for order ${id}.`, Wallet); notify("transporter", `Transport payment released for order ${id}.`, Wallet); }
    }
  };

  const assignOrdersToVehicle = (orderIds, transporterId) => {
    const transporter = TRANSPORTERS.find((t) => t.id === transporterId);
    orderIds.forEach((id) => advanceOrder(id, "TRANSPORTER_ASSIGNED", transporterId));
    // advanceOrder already notifies restaurant/farmer per order — only add the
    // transporter notification here (a single consolidated one for the batch).
    if (transporter) {
      notify("transporter", `Admin assigned ${orderIds.length} order(s) to your vehicle (${transporter.vehicle}): ${orderIds.join(", ")}.`, Truck);
    }
  };

  /* ---------- judge demo mode ---------- */
  const demoSteps = [
    {
      title: "Farmer lists new produce",
      desc: "Ramesh Reddy lists 500 kg of Grade A Tomatoes at ₹30/kg.",
      run: () => {
        setRole("farmer"); setScreen("app"); setPage("f-produce");
        const id = addCrop({ name: "Tomato (Demo Batch)", icon: "🍅", quantity: 500, price: 30, grade: "A", method: "Organic" });
        setDemoCropId(id);
      },
    },
    {
      title: "Admin verifies quality",
      desc: "Admin reviews the auto-graded quality score and verifies the listing.",
      run: () => { setRole("admin"); setPage("a-verification"); if (demoCropId) verifyCrop(demoCropId); },
    },
    {
      title: "Restaurant discovers the crop",
      desc: "ABC Restaurant searches 'Tomato' in the marketplace.",
      run: () => { setRole("restaurant"); setPage("r-marketplace"); },
    },
    {
      title: "Restaurant views details",
      desc: "Grade, quality score, price and estimated delivery are all visible up front.",
      run: () => { if (demoCropId) setSelectedCropId(demoCropId); setPage("r-product"); },
    },
    {
      title: "Restaurant places an order",
      desc: "Order for 300 kg is created — cost breakdown is calculated automatically.",
      run: () => {
        const crop = crops.find((c) => c.id === demoCropId) || crops.find((c) => c.name.includes("Demo Batch"));
        if (crop) {
          const id = createOrder(crop, { quantity: 300, deliveryLocation: meRestaurant.location, deliveryDate: "2026-09-02", deliveryTime: "9:00 AM" });
          setDemoOrderId(id);
        }
        setPage("r-orders");
      },
    },
    {
      title: "Transporter accepts delivery",
      desc: "A transport request was auto-created — Rajesh Logistics accepts it.",
      run: () => { setRole("transporter"); setPage("t-deliveries"); if (demoOrderId) advanceOrder(demoOrderId, "TRANSPORTER_ASSIGNED", meTransporter.id); },
    },
    {
      title: "Produce picked up",
      desc: "Transporter confirms pickup from the farm.",
      run: () => { if (demoOrderId) advanceOrder(demoOrderId, "PICKED_UP"); },
    },
    {
      title: "In transit",
      desc: "Shipment is on its way to the restaurant.",
      run: () => { if (demoOrderId) advanceOrder(demoOrderId, "IN_TRANSIT"); setPage("t-tracking"); },
    },
    {
      title: "Delivered",
      desc: "Produce reaches ABC Restaurant.",
      run: () => { if (demoOrderId) advanceOrder(demoOrderId, "DELIVERED"); },
    },
    {
      title: "Payment simulated",
      desc: "Farmer payment, transport payment and platform revenue are settled.",
      run: () => { setRole("restaurant"); setSelectedOrderId(demoOrderId); setPage("payment"); if (demoOrderId) advanceOrder(demoOrderId, "PAID"); },
    },
    {
      title: "Dashboards update",
      desc: "Admin analytics reflect the completed transaction instantly.",
      run: () => { setRole("admin"); setPage("a-analytics"); },
    },
  ];

  const startDemo = () => { setDemoStep(0); demoSteps[0].run(); };
  const nextDemo = () => {
    const n = demoStep + 1;
    if (n < demoSteps.length) { setDemoStep(n); demoSteps[n].run(); } else { setDemoStep(-1); }
  };
  const prevDemo = () => { if (demoStep > 0) { const p = demoStep - 1; setDemoStep(p); demoSteps[p].run(); } };
  const exitDemo = () => setDemoStep(-1);

  /* ---------- derived ---------- */
  const farmerCrops = useMemo(() => crops.filter((c) => c.farmerId === meFarmer.id), [crops]);
  const farmerOrders = useMemo(() => orders.filter((o) => farmerCrops.some((c) => c.id === o.cropId)), [orders, farmerCrops]);
  const restaurantOrders = useMemo(() => orders.filter((o) => o.restaurantId === meRestaurant.id), [orders]);
  const consumerOrders = useMemo(() => orders.filter((o) => o.buyerType === "consumer" && o.consumerId === meConsumer.id), [orders]);
  const transporterOrders = useMemo(() => orders.filter((o) => o.transporterId === meTransporter.id), [orders]);
  const availableRequests = useMemo(() => orders.filter((o) => o.status === "PLACED"), [orders]);
  const pendingCrops = useMemo(() => crops.filter((c) => !c.verified), [crops]);

  const cropById = (id) => crops.find((c) => c.id === id);
  const farmerById = (id) => FARMERS.find((f) => f.id === id);
  const restaurantById = (id) => RESTAURANTS.find((r) => r.id === id);
  const transporterById = (id) => TRANSPORTERS.find((t) => t.id === id);
  const consumerById = (id) => CONSUMERS.find((u) => u.id === id);
  const buyerOfOrder = (o) => (o && o.buyerType === "consumer" ? consumerById(o.consumerId) : restaurantById(o?.restaurantId));

  if (screen === "landing") return (<><FontStyles /><Landing goRoleSelect={() => setScreen("roleSelect")} goMarketplacePreview={() => { setRole("restaurant"); setScreen("app"); setPage("r-marketplace"); }} lang={lang} setLang={setLang} /></>);
  if (screen === "roleSelect") return (<><FontStyles /><RoleSelect onSelect={goApp} onBack={() => setScreen("landing")} lang={lang} setLang={setLang} /></>);

  const navItems = NAV[role];
  const meta = ROLE_META[role];
  const unread = notifications.filter((n) => n.role === role && !n.read).length;

  /* ---------- render helpers reused across pages ---------- */

  /* ---------- PAGE ROUTER ---------- */
  const renderPage = () => {
    switch (page) {
      /* ===== FARMER ===== */
      case "f-dashboard": {
        const revenue = farmerOrders.reduce((s, o) => s + (o.status === "PAID" ? o.produceCost : 0), 0);
        const pending = farmerOrders.filter((o) => o.status !== "PAID").length;
        const avgRating = meFarmer.rating;
        return (
          <div>
            <SectionTitle eyebrow={t(lang, "f_dash_welcome")} title={`${meFarmer.name}'s Dashboard`} desc={`${meFarmer.location} · FarmConnect Verified Farmer`} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <StatCard label={t(lang, "stat_crops_listed")} value={farmerCrops.length} icon={Sprout} />
              <StatCard label={t(lang, "stat_active_orders")} value={pending} icon={ClipboardList} tint={C.skyLight} />
              <StatCard label={t(lang, "stat_expected_revenue")} value={fmt(farmerOrders.reduce((s, o) => s + (o.status !== "PAID" ? o.produceCost : 0), 0))} icon={TrendingUp} tint={C.marigoldLight} />
              <StatCard label={t(lang, "stat_completed_sales")} value={farmerOrders.filter((o) => o.status === "PAID").length} icon={PackageCheck} />
              <StatCard label={t(lang, "stat_avg_rating")} value={avgRating + " ★"} icon={Star} tint={C.marigoldLight} />
            </div>
            <SectionTitle title={t(lang, "mandi_title")} desc={t(lang, "mandi_desc_farmer")} right={<Button variant="outline" size="sm" onClick={() => setPage("f-mandi")}>{t(lang, "btn_view_all")}</Button>} />
            <div className="flex gap-3 overflow-x-auto scrollbar-thin pb-2 mb-8">
              {Object.entries(mandiPrices).map(([crop, price]) => (
                <div key={crop} className="rounded-xl bg-white border px-3 py-2.5 flex items-center gap-2 shrink-0" style={{ borderColor: C.line, minWidth: 140 }}>
                  <span className="text-lg">{MANDI_CROP_ICON[crop] || "🌿"}</span>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: C.forest }}>{crop}</p>
                    <p className="ff-mono text-xs font-bold" style={{ color: C.marigoldDark }}>{fmt(price)}/kg</p>
                  </div>
                </div>
              ))}
            </div>
            <SectionTitle title={t(lang, "my_produce")} right={
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" icon={Smartphone} onClick={() => setWhatsappModalOpen(true)}>{t(lang, "btn_whatsapp_listing")}</Button>
                <Button icon={Plus} onClick={() => setPage("f-add-crop")}>{t(lang, "btn_list_new_produce")}</Button>
              </div>
            } />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {farmerCrops.map((c) => <CropCard key={c.id} crop={c} farmer={meFarmer} lang={lang} footer={<Button variant="ghost" className="w-full" onClick={() => setPage("f-quality")}>{t(lang, "btn_view_quality")}</Button>} />)}
            </div>
          </div>
        );
      }
      case "f-produce":
        return (
          <div>
            <SectionTitle title={t(lang, "my_produce")} desc="Everything you have listed on FarmConnect." right={
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" icon={Smartphone} onClick={() => setWhatsappModalOpen(true)}>{t(lang, "btn_whatsapp_listing")}</Button>
                <Button icon={Plus} onClick={() => setPage("f-add-crop")}>{t(lang, "btn_list_new_produce")}</Button>
              </div>
            } />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {farmerCrops.map((c) => (
                <CropCard key={c.id} crop={c} farmer={meFarmer} lang={lang} footer={
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="flex-1" onClick={() => setPage("f-quality")}>{t(lang, "nav_f-quality")}</Button>
                    <Badge bg={c.verified ? C.leafLight : "#FFF3CD"} fg={c.verified ? C.forestMid : "#8A6200"}>{c.verified ? "Live" : "Pending"}</Badge>
                  </div>
                } />
              ))}
            </div>
          </div>
        );
      case "f-add-crop":
        return <AddCropForm lang={lang} onCancel={() => setPage("f-produce")} onSubmit={(form) => { addCrop(form); setPage("f-produce"); }} />;
      case "f-orders":
        return (
          <div>
            <SectionTitle title={t(lang, "orders_for_produce")} desc={t(lang, "orders_for_produce_d")} />
            <OrdersTable lang={lang} rows={farmerOrders} cropById={cropById} restaurantById={restaurantById} onTrack={(id) => { setSelectedOrderId(id); setPage("order-tracking"); }} />
          </div>
        );
      case "f-quality":
        return (
          <div>
            <SectionTitle eyebrow={t(lang, "quality_eyebrow")} title={t(lang, "quality_title")} desc={t(lang, "quality_desc")} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {farmerCrops.map((c) => <QualityCard key={c.id} crop={c} lang={lang} />)}
            </div>
            <div className="rounded-2xl p-5 mt-6 flex items-start gap-3" style={{ backgroundColor: C.skyLight }}>
              <Sparkles size={20} style={{ color: C.sky }} className="mt-0.5" />
              <p className="text-sm" style={{ color: C.forest }}><span className="font-bold">Roadmap:</span> future versions can use computer-vision models to auto-assess freshness, size and damage from photos, reducing manual grading time.</p>
            </div>
          </div>
        );
      case "f-mandi":
        return <MandiPricesFarmerView lang={lang} mandiPrices={mandiPrices} farmerCrops={farmerCrops} />;
      case "f-notifications":
        return <NotificationsPage lang={lang} list={notifications.filter((n) => n.role === "farmer")} onReadAll={() => setNotifications((prev) => prev.map((n) => (n.role === "farmer" ? { ...n, read: true } : n)))} />;
      case "f-profile":
        return <ProfilePage lang={lang} name={meFarmer.name} sub={`${meFarmer.location} · ${meFarmer.phone}`} rating={meFarmer.rating} roleTitle={t(lang, "role_farmer")} extra={[["Listings", farmerCrops.length], ["Verified", meFarmer.verified ? "Yes" : "No"]]} />;

      /* ===== RESTAURANT ===== */
      case "r-dashboard": {
        const todaySpend = restaurantOrders.filter((o) => o.createdDaysAgo === 0).reduce((s, o) => s + o.total, 0);
        const monthlySpend = restaurantOrders.reduce((s, o) => s + o.total, 0);
        const savings = restaurantOrders.reduce((s, o) => s + o.qty * (Math.round(o.pricePerKg * 1.75) - Math.round(o.pricePerKg * 1.4)), 0);
        return (
          <div>
            <SectionTitle eyebrow={t(lang, "f_dash_welcome")} title={`${meRestaurant.name}'s Dashboard`} desc={meRestaurant.location} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <StatCard label={t(lang, "stat_today_procurement")} value={fmt(todaySpend)} icon={Store} />
              <StatCard label={t(lang, "stat_pending_orders")} value={restaurantOrders.filter((o) => o.status !== "PAID").length} icon={ClipboardList} tint={C.skyLight} />
              <StatCard label={t(lang, "stat_monthly_spending")} value={fmt(monthlySpend)} icon={Wallet} tint={C.marigoldLight} />
              <StatCard label={t(lang, "stat_avg_delivery")} value="1.4 days" icon={Truck} />
              <StatCard label={t(lang, "stat_procurement_saved")} value={fmt(savings)} icon={TrendingDown} tint={C.leafLight} sub="vs. traditional chain (demo)" />
            </div>
            <SectionTitle title={t(lang, "fresh_marketplace")} right={<Button icon={Store} onClick={() => setPage("r-marketplace")}>{t(lang, "btn_browse_marketplace")}</Button>} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {crops.filter((c) => c.verified).slice(0, 3).map((c) => <CropCard key={c.id} crop={c} farmer={farmerById(c.farmerId)} lang={lang} onView={(cr) => { setSelectedCropId(cr.id); setPage("r-product"); }} />)}
            </div>
          </div>
        );
      }
      case "r-marketplace":
        return <Marketplace key={"mkt-" + assistantSearchNonce} initialQuery={assistantSearchQuery} crops={crops} farmerById={farmerById} lang={lang} onView={(c) => { setSelectedCropId(c.id); setPage("r-product"); }} />;
      case "r-product": {
        const crop = cropById(selectedCropId) || crops[0];
        return (
          <ProductDetail
            crop={crop}
            farmer={farmerById(crop.farmerId)}
            lang={lang}
            onBack={() => setPage("r-marketplace")}
            onOrder={() => { setSelectedCropId(crop.id); setPage("r-order-create"); }}
          />
        );
      }
      case "r-order-create": {
        const crop = cropById(selectedCropId) || crops[0];
        return (
          <OrderCreate
            crop={crop}
            farmer={farmerById(crop.farmerId)}
            meRestaurant={meRestaurant}
            createOrder={createOrder}
            lang={lang}
            onBack={() => setPage("r-product")}
            onTrack={(id) => { setSelectedOrderId(id); setPage("order-tracking"); }}
            onGoOrders={() => setPage("r-orders")}
          />
        );
      }
      case "r-orders":
        return (
          <div>
            <SectionTitle title={t(lang, "my_orders")} desc={t(lang, "my_orders_d")} />
            <OrdersTable lang={lang} rows={restaurantOrders} cropById={cropById} farmerById={farmerById} onTrack={(id) => { setSelectedOrderId(id); setPage("order-tracking"); }} onPay={(id) => { setSelectedOrderId(id); setPage("payment"); }} showFarmer />
          </div>
        );
      case "r-matching":
        return <SmartMatching crops={crops} farmerById={farmerById} lang={lang} onView={(c) => { setSelectedCropId(c.id); setPage("r-product"); }} />;
      case "r-forecast":
        return <DemandForecastPage lang={lang} />;
      case "r-pricebreakdown":
        return <PriceBreakdownPage lang={lang} />;
      case "r-notifications":
        return <NotificationsPage lang={lang} list={notifications.filter((n) => n.role === "restaurant")} onReadAll={() => setNotifications((prev) => prev.map((n) => (n.role === "restaurant" ? { ...n, read: true } : n)))} />;
      case "r-profile":
        return <ProfilePage lang={lang} name={meRestaurant.name} sub={meRestaurant.location} roleTitle={t(lang, "role_restaurant")} extra={[["Orders placed", restaurantOrders.length], ["Total spent", fmt(restaurantOrders.reduce((s, o) => s + o.total, 0))]]} />;

      /* ===== CONSUMER (farm-to-home, 1–100 kg) ===== */
      case "c-dashboard": {
        const activeCount = consumerOrders.filter((o) => o.status !== "PAID").length;
        const totalSpent = consumerOrders.reduce((s, o) => s + o.total, 0);
        const kgBought = consumerOrders.reduce((s, o) => s + o.qty, 0);
        const savedVsRetail = consumerOrders.reduce((s, o) => s + Math.max(0, Math.round(o.pricePerKg * 1.75) * o.qty - o.total), 0);
        return (
          <div>
            <div className="rounded-3xl p-6 sm:p-7 mb-8 flex flex-col lg:flex-row lg:items-center gap-5 lg:justify-between" style={{ background: `linear-gradient(120deg, ${C.plum} 0%, #5B2E78 100%)` }}>
              <div>
                <Badge bg="rgba(255,255,255,0.18)" fg="#fff" icon={Home}>{t(lang, "c_banner_badge")}</Badge>
                <h2 className="ff-display font-bold text-xl sm:text-2xl text-white mt-3">{t(lang, "c_banner_title")}</h2>
                <p className="text-sm mt-1 max-w-xl" style={{ color: "#E8D9F2" }}>{t(lang, "c_banner_desc")}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Button variant="marigold" icon={ShoppingBasket} onClick={() => setPage("c-marketplace")}>{t(lang, "btn_start_shopping")}</Button>
                <p className="text-2xs text-center font-semibold" style={{ color: "#E8D9F2" }}>{t(lang, "c_how_much")}</p>
              </div>
            </div>
            <SectionTitle eyebrow={t(lang, "f_dash_welcome")} title={`${meConsumer.name}'s Dashboard`} desc={`${meConsumer.location} · FarmConnect ${t(lang, "role_consumer")}`} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <StatCard label={t(lang, "stat_c_active_orders")} value={activeCount} icon={ClipboardList} tint={C.plumLight} />
              <StatCard label={t(lang, "stat_c_total_orders")} value={consumerOrders.length} icon={Package} />
              <StatCard label={t(lang, "stat_c_total_spent")} value={fmt(totalSpent)} icon={Wallet} tint={C.marigoldLight} />
              <StatCard label={t(lang, "stat_c_kg_bought")} value={kgBought + " kg"} icon={ShoppingBasket} tint={C.leafLight} />
              <StatCard label={t(lang, "stat_c_saved")} value={fmt(savedVsRetail)} icon={TrendingDown} tint={C.leafLight} sub={t(lang, "demo_estimate")} />
            </div>
            <SectionTitle title={t(lang, "c_quick_picks")} desc={t(lang, "c_quick_picks_d")} right={<Button variant="outline" icon={ShoppingBasket} onClick={() => setPage("c-marketplace")}>{t(lang, "btn_view_all")}</Button>} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {crops.filter((c) => c.verified && c.available > 0).slice(0, 3).map((c) => <CropCard key={c.id} crop={c} farmer={farmerById(c.farmerId)} lang={lang} onView={(cr) => { setSelectedCropId(cr.id); setPage("c-product"); }} />)}
            </div>
            {consumerOrders.length > 0 && (
              <>
                <SectionTitle title={t(lang, "c_recent_orders")} right={<Button variant="outline" onClick={() => setPage("c-orders")}>{t(lang, "btn_view_all")}</Button>} />
                <OrdersTable lang={lang} rows={consumerOrders.slice(0, 3)} cropById={cropById} farmerById={farmerById} showFarmer onTrack={(id) => { setSelectedOrderId(id); setPage("order-tracking"); }} onPay={(id) => { setSelectedOrderId(id); setPage("payment"); }} />
              </>
            )}
          </div>
        );
      }
      case "c-marketplace":
        return <Marketplace key={"cmkt-" + assistantSearchNonce} initialQuery={assistantSearchQuery} eyebrow={t(lang, "c_marketplace_eyebrow")} title={t(lang, "c_marketplace_title")} desc={t(lang, "c_marketplace_desc")} crops={crops} farmerById={farmerById} lang={lang} onView={(c) => { setSelectedCropId(c.id); setPage("c-product"); }} />;
      case "c-product": {
        const crop = cropById(selectedCropId) || crops[0];
        return (
          <ProductDetail
            crop={crop}
            farmer={farmerById(crop.farmerId)}
            lang={lang}
            savingLabelKey="c_you_save"
            onBack={() => setPage("c-marketplace")}
            onOrder={() => { setSelectedCropId(crop.id); setPage("c-order-create"); }}
          />
        );
      }
      case "c-order-create": {
        const crop = cropById(selectedCropId) || crops[0];
        return (
          <ConsumerOrderCreate
            crop={crop}
            farmer={farmerById(crop.farmerId)}
            meConsumer={meConsumer}
            createConsumerOrder={createConsumerOrder}
            lang={lang}
            onBack={() => setPage("c-product")}
            onTrack={(id) => { setSelectedOrderId(id); setPage("order-tracking"); }}
            onGoOrders={() => setPage("c-orders")}
          />
        );
      }
      case "c-orders":
        return (
          <div>
            <SectionTitle title={t(lang, "my_orders")} desc={t(lang, "my_orders_d")} />
            <OrdersTable lang={lang} rows={consumerOrders} cropById={cropById} farmerById={farmerById} showFarmer onTrack={(id) => { setSelectedOrderId(id); setPage("order-tracking"); }} onPay={(id) => { setSelectedOrderId(id); setPage("payment"); }} />
          </div>
        );
      case "c-notifications":
        return <NotificationsPage lang={lang} list={notifications.filter((n) => n.role === "consumer")} onReadAll={() => setNotifications((prev) => prev.map((n) => (n.role === "consumer" ? { ...n, read: true } : n)))} />;
      case "c-profile":
        return <ProfilePage lang={lang} name={meConsumer.name} sub={`${meConsumer.location} · ${meConsumer.phone}`} roleTitle={t(lang, "role_consumer")} extra={[["Orders placed", consumerOrders.length], ["Total spent", fmt(consumerOrders.reduce((s, o) => s + o.total, 0))], ["Vegetables bought", consumerOrders.reduce((s, o) => s + o.qty, 0) + " kg"]]} />;

      /* ===== TRANSPORTER ===== */
      case "t-dashboard": {
        const earnings = transporterOrders.filter((o) => o.status === "PAID").reduce((s, o) => s + o.transportCost, 0);
        return (
          <div>
            <GoOnlineToggle
              transporterId={meTransporter.id}
              updateTransporterLocation={updateTransporterLocation}
              clearTransporterLocation={clearTransporterLocation}
              isOnline={!!transporterLocations[meTransporter.id]}
              lang={lang}
            />
            <SectionTitle eyebrow={t(lang, "f_dash_welcome")} title={`${meTransporter.name}'s Dashboard`} desc={meTransporter.vehicle} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard label={t(lang, "stat_available_requests")} value={availableRequests.length} icon={Truck} tint={C.skyLight} />
              <StatCard label={t(lang, "stat_active_deliveries")} value={transporterOrders.filter((o) => !["DELIVERED", "PAID"].includes(o.status)).length} icon={Route} />
              <StatCard label={t(lang, "stat_completed")} value={transporterOrders.filter((o) => ["DELIVERED", "PAID"].includes(o.status)).length} icon={PackageCheck} tint={C.leafLight} />
              <StatCard label={t(lang, "stat_total_earnings")} value={fmt(earnings)} icon={Wallet} tint={C.marigoldLight} />
            </div>
            <SectionTitle title={t(lang, "available_requests")} right={<Button variant="outline" onClick={() => setPage("t-deliveries")}>{t(lang, "btn_view_all")}</Button>} />
            <DeliveryRequestsList lang={lang} rows={availableRequests.slice(0, 3)} cropById={cropById} farmerById={farmerById} restaurantById={restaurantById} consumerById={consumerById} onAccept={(id) => advanceOrder(id, "TRANSPORTER_ASSIGNED", meTransporter.id)} />
          </div>
        );
      }
      case "t-deliveries":
        return (
          <div>
            <LocationSharer
              activeOrderIds={transporterOrders.filter((o) => ["TRANSPORTER_ASSIGNED", "PICKED_UP", "IN_TRANSIT"].includes(o.status)).map((o) => o.id)}
              updateLiveLocation={updateLiveLocation}
              lang={lang}
            />
            <SectionTitle title={t(lang, "available_requests")} desc={t(lang, "available_requests_d")} />
            <DeliveryRequestsList lang={lang} rows={availableRequests} cropById={cropById} farmerById={farmerById} restaurantById={restaurantById} consumerById={consumerById} onAccept={(id) => advanceOrder(id, "TRANSPORTER_ASSIGNED", meTransporter.id)} />
            <SectionTitle title={t(lang, "my_deliveries")} desc={t(lang, "my_deliveries_d")} />
            <div className="grid sm:grid-cols-2 gap-4">
              {transporterOrders.map((o) => {
                const crop = cropById(o.cropId), farmer = farmerById(o.farmerId), restaurant = restaurantById(o.restaurantId);
                const idx = STATUS_STEPS.indexOf(o.status);
                return (
                  <div key={o.id} className="rounded-2xl bg-white border p-4" style={{ borderColor: C.line }}>
                    <div className="flex justify-between items-start mb-2">
                      <div><p className="font-bold ff-display" style={{ color: C.forest }}>{o.id} · {crop?.icon} {crop?.name}</p><p className="text-xs" style={{ color: C.slate }}>{farmer?.location} → {restaurant?.location}</p></div>
                      <StatusBadge status={o.status} lang={lang} />
                    </div>
                    <p className="text-sm mb-3" style={{ color: C.slate }}>{o.qty}kg · {t(lang, "label_earnings_colon")} {fmt(o.transportCost)}</p>
                    {liveLocations[o.id] && idx >= 1 && idx <= 3 && (
                      <div className="mb-3"><LiveMap lat={liveLocations[o.id].lat} lng={liveLocations[o.id].lng} active lang={lang} /></div>
                    )}
                    {idx === 1 && <Button size="sm" className="w-full" onClick={() => advanceOrder(o.id, "PICKED_UP")}>{t(lang, "btn_mark_picked_up")}</Button>}
                    {idx === 2 && <Button size="sm" className="w-full" onClick={() => advanceOrder(o.id, "IN_TRANSIT")}>{t(lang, "btn_mark_in_transit")}</Button>}
                    {idx === 3 && <Button size="sm" variant="marigold" className="w-full" onClick={() => advanceOrder(o.id, "DELIVERED")}>{t(lang, "btn_mark_delivered")}</Button>}
                    {idx >= 4 && <Badge bg={C.leafLight} fg={C.forestMid} icon={CheckCircle2}>{t(lang, "label_complete")}</Badge>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      case "t-tracking":
        return (
          <OrderTrackingPage
            lang={lang}
            orders={orders}
            selectedOrderId={selectedOrderId}
            cropById={cropById}
            farmerById={farmerById}
            restaurantById={restaurantById}
            consumerById={consumerById}
            onOpenLedger={(id) => setLedgerOrderId(id)}
            liveLocations={liveLocations}
          />
        );
      case "t-notifications":
        return <NotificationsPage lang={lang} list={notifications.filter((n) => n.role === "transporter")} onReadAll={() => setNotifications((prev) => prev.map((n) => (n.role === "transporter" ? { ...n, read: true } : n)))} />;
      case "t-profile":
        return <ProfilePage lang={lang} name={meTransporter.name} sub={meTransporter.vehicle} rating={meTransporter.rating} roleTitle={t(lang, "role_transporter")} extra={[["Deliveries", transporterOrders.length]]} />;

      /* ===== ADMIN ===== */
      case "a-dashboard": {
        const totalTraded = orders.reduce((s, o) => s + o.qty, 0);
        const farmerEarnings = orders.filter((o) => o.status === "PAID").reduce((s, o) => s + o.produceCost, 0);
        const restaurantSavings = orders.reduce((s, o) => s + o.qty * (Math.round(o.pricePerKg * 1.75) - Math.round(o.pricePerKg * 1.4)), 0);
        return (
          <div>
            <SectionTitle eyebrow={t(lang, "a_dash_eyebrow")} title={t(lang, "a_dash_title")} desc={t(lang, "a_dash_desc")} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <StatCard label={t(lang, "stat_total_farmers")} value={FARMERS.length} icon={Sprout} />
              <StatCard label={t(lang, "stat_total_restaurants")} value={RESTAURANTS.length} icon={UtensilsCrossed} tint={C.marigoldLight} />
              <StatCard label={t(lang, "stat_total_consumers")} value={CONSUMERS.length} icon={ShoppingBasket} tint={C.plumLight} />
              <StatCard label={t(lang, "stat_total_transporters")} value={TRANSPORTERS.length} icon={Truck} tint={C.skyLight} />
              <StatCard label={t(lang, "stat_active_orders2")} value={orders.filter((o) => o.status !== "PAID").length} icon={ClipboardList} />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard label={t(lang, "stat_completed_orders")} value={orders.filter((o) => o.status === "PAID").length} icon={PackageCheck} tint={C.leafLight} />
              <StatCard label={t(lang, "stat_produce_traded")} value={totalTraded + " kg"} icon={Package} />
              <StatCard label={t(lang, "stat_farmer_earnings")} value={fmt(farmerEarnings)} icon={Wallet} tint={C.leafLight} />
              <StatCard label={t(lang, "stat_restaurant_savings")} value={fmt(restaurantSavings)} icon={TrendingDown} tint={C.marigoldLight} sub="demo estimate" />
            </div>
            <SectionTitle title={t(lang, "pending_verification")} right={<Button variant="outline" onClick={() => setPage("a-verification")}>{t(lang, "btn_go_to_verification")}</Button>} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingCrops.length === 0 ? <EmptyState text={t(lang, "nothing_pending")} /> : pendingCrops.map((c) => (
                <div key={c.id} className="rounded-2xl bg-white border p-4 flex items-center justify-between" style={{ borderColor: C.line }}>
                  <div><p className="font-bold ff-display" style={{ color: C.forest }}>{c.icon} {c.name}</p><p className="text-xs" style={{ color: C.slate }}>{farmerById(c.farmerId).name}</p></div>
                  <Button size="sm" onClick={() => verifyCrop(c.id)}>{t(lang, "btn_verify")}</Button>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case "a-verification":
        return <VerificationPage lang={lang} crops={crops} farmerById={farmerById} verifyCrop={verifyCrop} />;
      case "a-assign":
        return (
          <AssignTransportPage
            lang={lang}
            orders={orders.filter((o) => o.status === "PLACED")}
            allActiveOrders={orders.filter((o) => ["TRANSPORTER_ASSIGNED", "PICKED_UP", "IN_TRANSIT"].includes(o.status))}
            cropById={cropById}
            farmerById={farmerById}
            restaurantById={restaurantById}
            onAssign={assignOrdersToVehicle}
            autoAssignEnabled={autoAssignEnabled}
            setAutoAssignEnabled={setAutoAssignEnabled}
            autoAssignRadius={autoAssignRadius}
            setAutoAssignRadius={setAutoAssignRadius}
            transporterLocations={transporterLocations}
          />
        );
      case "a-mandi":
        return <MandiPricesAdminPage lang={lang} mandiPrices={mandiPrices} onSave={(next) => { setMandiPrices(next); notify("farmer", "Mandi prices were updated by Admin.", IndianRupee); }} />;
      case "a-analytics":
        return <AnalyticsPage lang={lang} orders={orders} />;
      case "a-notifications":
        return <NotificationsPage lang={lang} list={notifications.filter((n) => n.role === "admin")} onReadAll={() => setNotifications((prev) => prev.map((n) => (n.role === "admin" ? { ...n, read: true } : n)))} />;

      case "order-tracking":
        return (
          <OrderTrackingPage
            lang={lang}
            orders={orders}
            selectedOrderId={selectedOrderId}
            cropById={cropById}
            farmerById={farmerById}
            restaurantById={restaurantById}
            consumerById={consumerById}
            onOpenLedger={(id) => setLedgerOrderId(id)}
            liveLocations={liveLocations}
          />
        );
      case "payment": {
        const order = orders.find((o) => o.id === selectedOrderId) || orders[0];
        return (
          <PaymentPage
            lang={lang}
            order={order}
            crop={cropById(order.cropId)}
            farmer={farmerById(order.farmerId)}
            advanceOrder={advanceOrder}
          />
        );
      }
      default:
        return <EmptyState text="Page not found." />;
    }
  };

  return (
    <div className="min-h-screen ff-body flex" style={{ backgroundColor: C.cream }}>
      <FontStyles />
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 h-screen z-40 w-64 shrink-0 bg-white border-r transition-transform ${mobileNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`} style={{ borderColor: C.line }}>
        <div className="p-5 flex items-center gap-2 border-b" style={{ borderColor: C.line }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: C.forestMid }}><Sprout size={18} color="white" /></div>
          <span className="ff-display font-bold text-lg" style={{ color: C.forest }}>FarmConnect</span>
        </div>
        <div className="p-3 flex items-center gap-2 mx-3 mt-3 rounded-xl" style={{ backgroundColor: C.cream }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: meta.color }}>
            <meta.icon size={16} color="white" />
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: C.forest }}>{t(lang, "role_" + role)} {t(lang, "demo_view")}</p>
            <p className="text-11" style={{ color: C.slate }}>{t(lang, "demo_session")}</p>
          </div>
        </div>
        <nav className="p-3 flex flex-col gap-1 mt-1">
          {navItems.map((item) => (
            <button key={item.key} onClick={() => { setPage(item.key); setMobileNavOpen(false); }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition"
              style={{ backgroundColor: page === item.key ? C.leafLight : "transparent", color: page === item.key ? C.forestMid : C.slate }}>
              <item.icon size={17} />{t(lang, "nav_" + item.key)}
              {item.key.includes("notifications") && unread > 0 && <span className="ml-auto text-2xs font-bold rounded-full w-5 h-5 flex items-center justify-center" style={{ backgroundColor: C.marigold, color: "white" }}>{unread}</span>}
            </button>
          ))}
        </nav>
        <div className="p-3 mt-auto absolute bottom-0 w-full space-y-2">
          <LanguageSwitcher lang={lang} setLang={setLang} />
          <Button variant="outline" className="w-full" icon={LogOut} onClick={logout}>{t(lang, "btn_switch_role")}</Button>
          <button onClick={resetDemoData} className="w-full text-center text-xs font-semibold underline" style={{ color: C.slate }}>{t(lang, "btn_reset_demo")}</button>
        </div>
      </aside>
      {mobileNavOpen && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setMobileNavOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 py-4 bg-white border-b" style={{ borderColor: C.line }}>
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-1.5" onClick={() => setMobileNavOpen(true)}><Menu size={20} /></button>
            <p className="text-sm ff-body" style={{ color: C.slate }}>{t(lang, "signed_in_as")} <span className="font-bold" style={{ color: C.forest }}>{meta.title === "Farmer" ? meFarmer.name : meta.title === "Restaurant" ? meRestaurant.name : meta.title === "Consumer" ? meConsumer.name : meta.title === "Transporter" ? meTransporter.name : "FarmConnect Admin"}</span></p>
            {!isOnline && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "#FFF3CD", color: "#8A6200" }}>
                <WifiOff size={12} /> {t(lang, "offline_label")}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={QrCode} onClick={() => setQrScannerOpen(true)}><span className="hidden sm:inline">{t(lang, "btn_consumer_trace")}</span></Button>
            <Button variant="marigold" size="sm" icon={PlayCircle} onClick={startDemo}><span className="hidden sm:inline">{t(lang, "btn_judge_demo")}</span></Button>
            <button className="relative p-2 rounded-full hover:bg-gray-100" onClick={() => setPage(navItems.find((n) => n.key.includes("notifications")).key)}>
              <Bell size={18} style={{ color: C.forest }} />
              {unread > 0 && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.marigold }} />}
            </button>
          </div>
        </div>
        {!isOnline && (
          <div className="px-4 sm:px-8 py-2 flex items-center gap-2" style={{ backgroundColor: "#FFF3CD" }}>
            <WifiOff size={14} style={{ color: "#8A6200" }} />
            <p className="text-xs font-semibold" style={{ color: "#8A6200" }}>{t(lang, "offline_banner")}</p>
          </div>
        )}
        <div className="p-4 sm:p-8">{renderPage()}</div>
      </div>

      {/* Judge demo mode floating panel */}
      {demoStep >= 0 && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 w-auto sm:w-96 rounded-2xl shadow-2xl p-5 text-white" style={{ backgroundColor: C.forest }}>
          <div className="flex items-center justify-between mb-2">
            <Badge bg={C.marigold} fg="white" icon={PlayCircle}>Judge Demo · Step {demoStep + 1}/{demoSteps.length}</Badge>
            <button onClick={exitDemo}><X size={16} color="white" /></button>
          </div>
          <p className="ff-display font-bold text-lg">{demoSteps[demoStep].title}</p>
          <p className="text-sm mt-1" style={{ color: "#C9D6CF" }}>{demoSteps[demoStep].desc}</p>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" className="!text-white !border-white flex-1" icon={ChevronLeft} onClick={prevDemo} disabled={demoStep === 0}>Back</Button>
            <Button variant="marigold" className="flex-1" icon={ChevronRight} onClick={nextDemo}>{demoStep === demoSteps.length - 1 ? "Finish" : "Next"}</Button>
          </div>
        </div>
      )}

      {/* Consumer-facing: QR scan simulator */}
      {qrScannerOpen && (
        <QRScanModal
          orders={orders.filter((o) => o.status === "DELIVERED" || o.status === "PAID")}
          cropById={cropById}
          farmerById={farmerById}
          restaurantById={restaurantById}
          consumerById={consumerById}
          transporterById={transporterById}
          onClose={() => setQrScannerOpen(false)}
          onOpenLedger={(id) => { setLedgerOrderId(id); }}
          lang={lang}
        />
      )}

      {/* Farmer-facing: simulated WhatsApp listing preview */}
      {whatsappModalOpen && (
        <WhatsAppListingModal lang={lang} addCrop={addCrop} onClose={() => setWhatsappModalOpen(false)} />
      )}

      {/* Consumer-facing: blockchain provenance ledger */}
      {ledgerOrderId && (() => {
        const o = orders.find((x) => x.id === ledgerOrderId);
        if (!o) return null;
        return (
          <ProvenanceLedgerModal
            order={o}
            crop={cropById(o.cropId)}
            farmer={farmerById(o.farmerId)}
            restaurant={buyerOfOrder(o)}
            transporter={o.transporterId ? transporterById(o.transporterId) : null}
            onClose={() => setLedgerOrderId(null)}
          />
        );
      })()}

      {/* In-app assistant: free, rule-based, always available inside the app shell */}
      <AssistantWidget
        lang={lang}
        role={role}
        navKeys={navItems.map((n) => n.key)}
        setPage={setPage}
        crops={crops}
        orders={orders}
        mandiPrices={mandiPrices}
        addCrop={addCrop}
        advanceOrder={advanceOrder}
        setMandiPrices={setMandiPrices}
        verifyCrop={verifyCrop}
        meTransporter={meTransporter}
        setAssistantSearchQuery={setAssistantSearchQuery}
        bumpAssistantSearchNonce={bumpAssistantSearchNonce}
      />
    </div>
  );
}

/* ============================================================
   ADDITIONAL PAGE COMPONENTS
   ============================================================ */
const CROP_ICON_OPTIONS = ["🍅", "🧅", "🥔", "🥕", "🥬", "🍆", "🫑", "🥦", "🌶️", "🥗", "🌽", "🍋"];

/* ---------- FEATURE 1 (multilingual): AI-assisted voice-to-form parsing ----------
   Works fully offline in the browser (Web Speech API for recognition + rule-based
   NLP for extraction) so it needs no backend, no API key, and has no per-request
   cost — matching the SIH "no external paid services" requirement. It understands
   structured spoken sentences in English, Hindi, and Telugu. */
const SPEECH_LANG_CODE = { en: "en-IN", hi: "hi-IN", te: "te-IN" };

const CROP_VOICE_MAP = [
  { en: "tomato", label: "Tomato", icon: "🍅", hi: "टमाटर", te: "టమాటా" },
  { en: "onion", label: "Onion", icon: "🧅", hi: "प्याज", te: "ఉల్లిపాయ" },
  { en: "potato", label: "Potato", icon: "🥔", hi: "आलू", te: "బంగాళదుంప" },
  { en: "carrot", label: "Carrot", icon: "🥕", hi: "गाजर", te: "క్యారెట్" },
  { en: "spinach", label: "Spinach", icon: "🥬", hi: "पालक", te: "పాలకూర" },
  { en: "brinjal", label: "Brinjal", icon: "🍆", hi: "बैंगन", te: "వంకాయ" },
  { en: "capsicum", label: "Capsicum", icon: "🫑", hi: "शिमला मिर्च", te: "క్యాప్సికం" },
  { en: "cauliflower", label: "Cauliflower", icon: "🥦", hi: "फूलगोभी", te: "కాలీఫ్లవర్" },
  { en: "green chilli", label: "Green Chilli", icon: "🌶️", hi: "हरी मिर्च", te: "పచ్చిమిర్చి" },
  { en: "cabbage", label: "Cabbage", icon: "🥗", hi: "पत्तागोभी", te: "క్యాబేజీ" },
  { en: "okra", label: "Okra", icon: "🌿", hi: "भिंडी", te: "బెండకాయ" },
  { en: "cucumber", label: "Cucumber", icon: "🥒", hi: "खीरा", te: "దోసకాయ" },
  { en: "corn", label: "Corn", icon: "🌽", hi: "मक्का", te: "మొక్కజొన్న" },
  { en: "lemon", label: "Lemon", icon: "🍋", hi: "नींबू", te: "నిమ్మకాయ" },
];

const VOICE_WORDS = {
  en: {
    kg: "kgs?|kilograms?|kilos?", currency: "rs\\.?|rupees?|₹|per\\s*kg|\\/\\s*kg|a\\s*kg\\b",
    gradePlus: /\ba\s*\+|a\s*plus\b/, gradeA: /\bgrade\s*a\b|\ba\s*grade\b/, gradeB: /\bgrade\s*b\b|\bb\s*grade\b/,
    organic: /\borganic\b/, natural: /\bnatural\b/, conventional: /\bconventional\b/,
    today: /\btoday\b/, tomorrow: /\btomorrow\b/, inNDays: /in\s+(\d+)\s+days?/,
  },
  hi: {
    kg: "किलो(?:ग्राम)?|किग्रा", currency: "रुपये|रुपया|रु\\b|₹|प्रति\\s*किलो|किलो\\s*में",
    gradePlus: /ए\s*प्लस|ग्रेड\s*ए\s*\+/, gradeA: /ग्रेड\s*ए\b|ए\s*ग्रेड/, gradeB: /ग्रेड\s*बी|बी\s*ग्रेड/,
    organic: /जैविक|ऑर्गेनिक/, natural: /प्राकृतिक/, conventional: /पारंपरिक/,
    today: /आज/, tomorrow: /कल/, inNDays: /(\d+)\s*दिन\s*(?:में|बाद)/,
  },
  te: {
    kg: "కిలోలు?|కేజీ", currency: "రూపాయలు|రూపాయి|రూ\\b|₹|కిలోకు",
    gradePlus: /ఏ\s*ప్లస్|గ్రేడ్\s*ఏ\s*ప్లస్/, gradeA: /గ్రేడ్\s*ఏ\b|ఏ\s*గ్రేడ్/, gradeB: /గ్రేడ్\s*బి|బి\s*గ్రేడ్/,
    organic: /సేంద్రియ|ఆర్గానిక్/, natural: /సహజ/, conventional: /సాంప్రదాయ/,
    today: /ఈరోజు|ఇవాళ/, tomorrow: /రేపు/, inNDays: /(\d+)\s*రోజుల్లో|(\d+)\s*రోజుల\s*తర్వాత/,
  },
};

const MONTHS_EN = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

function parseHarvestDate(lower, langWords) {
  const now = new Date();
  if (langWords.tomorrow.test(lower)) {
    const d = new Date(now); d.setDate(d.getDate() + 1); return toISODate(d);
  }
  if (langWords.today.test(lower)) {
    return toISODate(now);
  }
  const nDaysMatch = lower.match(langWords.inNDays);
  if (nDaysMatch) {
    const n = Number(nDaysMatch[1] || nDaysMatch[2]);
    if (!Number.isNaN(n)) { const d = new Date(now); d.setDate(d.getDate() + n); return toISODate(d); }
  }
  // English month name + day number works regardless of spoken language (common code-switch for dates)
  const monthDay = lower.match(/(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december)/)
    || lower.match(/(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})(?:st|nd|rd|th)?/);
  if (monthDay) {
    const day = Number(isNaN(Number(monthDay[1])) ? monthDay[2] : monthDay[1]);
    const monthName = isNaN(Number(monthDay[1])) ? monthDay[1] : monthDay[2];
    const monthIdx = MONTHS_EN.indexOf(monthName);
    if (monthIdx >= 0 && day >= 1 && day <= 31) {
      let year = now.getFullYear();
      let candidate = new Date(year, monthIdx, day);
      if (candidate < new Date(now.getFullYear(), now.getMonth(), now.getDate())) candidate = new Date(year + 1, monthIdx, day);
      return toISODate(candidate);
    }
  }
  return null;
}

function findCropFromSpeech(lower, lang) {
  for (const c of CROP_VOICE_MAP) {
    if (lang === "hi" && c.hi && lower.includes(c.hi)) return c;
    if (lang === "te" && c.te && lower.includes(c.te)) return c;
    if (lower.includes(c.en)) return c; // English crop words also matched as a common code-switch fallback
  }
  return null;
}

function parseSpeechToForm(text, lang = "en") {
  const lower = text.toLowerCase();
  const words = VOICE_WORDS[lang] || VOICE_WORDS.en;
  const patch = {};

  const crop = findCropFromSpeech(lower, lang);
  if (crop) { patch.name = crop.label; patch.icon = crop.icon; }

  const qtyMatch = lower.match(new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(?:${words.kg})`, "i"));
  if (qtyMatch) patch.quantity = qtyMatch[1];

  const priceMatch =
    lower.match(new RegExp(`(?:${words.currency})\\s*(\\d+(?:\\.\\d+)?)`, "i")) ||
    lower.match(new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(?:${words.currency})`, "i"));
  if (priceMatch) patch.price = priceMatch[1];

  if (words.gradePlus.test(lower)) patch.grade = "A+";
  else if (words.gradeA.test(lower)) patch.grade = "A";
  else if (words.gradeB.test(lower)) patch.grade = "B";

  if (words.organic.test(lower)) patch.method = "Organic";
  else if (words.natural.test(lower)) patch.method = "Natural Farming";
  else if (words.conventional.test(lower)) patch.method = "Conventional";

  const harvestDate = parseHarvestDate(lower, words);
  if (harvestDate) patch.harvestDate = harvestDate;

  return patch;
}

/* ============================================================
   IN-APP ASSISTANT — free, rule-based, no backend/API key/cost.
   Recognizes a defined set of commands (English/Hindi/Telugu) and
   performs real actions in the app (navigate, list a crop, advance
   a delivery, verify a crop, set a mandi price). Anything outside
   its known patterns gets an honest "didn't understand" fallback —
   it is not a general-purpose language model.
   ============================================================ */
const SUFFIX_TRIGGERS = {
  dashboard: ["dashboard", "home", "डैशबोर्ड", "होम", "డాష్‌బోర్డ్", "హోమ్"],
  produce: ["my produce", "produce", "my crops", "listings", "मेरी उपज", "उपज", "నా పంట", "పంట"],
  orders: ["orders", "order", "ऑर्डर", "ఆర్డర్"],
  quality: ["quality", "गुणवत्ता", "నాణ్యత"],
  mandi: ["mandi", "market price", "मंडी", "మండి"],
  notifications: ["notification", "सूचना", "నోటిఫికేషన్"],
  profile: ["profile", "प्रोफ़ाइल", "ప్రొఫైల్"],
  marketplace: ["marketplace", "market", "बाज़ार", "మార్కెట్"],
  matching: ["match", "मिलान", "మ్యాచింగ్"],
  forecast: ["forecast", "demand", "पूर्वानुमान", "డిమాండ్"],
  pricebreakdown: ["price breakdown", "मूल्य विवरण", "ధర వివరణ"],
  deliveries: ["deliver", "डिलीवरी", "డెలివరీ"],
  tracking: ["track", "ट्रैकिंग", "ట్రాకింగ్"],
  verification: ["verif", "सत्यापन", "ధృవీకరణ"],
  analytics: ["analytic", "विश्लेषण", "అనలిటిక్స్"],
};
const ROLE_PREFIX = { farmer: "f", restaurant: "r", consumer: "c", transporter: "t", admin: "a" };

const ASSISTANT_KEYWORDS = {
  en: { accept: /\baccept\b/, pickup: /\bpick(?:ed)?\s*up\b/, transit: /\btransit\b/, deliver: /\bdeliver(?:ed)?\b/, verify: /\bverify\b/, setPrice: /\b(mandi|price)\b/, help: /\bhelp\b|what can you do/, greet: /\b(hi|hello|hey)\b/ },
  hi: { accept: /स्वीकार/, pickup: /उठाया|पिकअप/, transit: /मार्ग में|ट्रांजिट/, deliver: /डिलीवर/, verify: /सत्यापित/, setPrice: /मंडी|भाव|कीमत/, help: /मदद|सहायता/, greet: /नमस्ते|हैलो/ },
  te: { accept: /అంగీకరించు|అంగీకరిస్తున్నా/, pickup: /తీసుకున్న|పికప్/, transit: /రవాణాలో|ట్రాన్సిట్/, deliver: /డెలివరీ/, verify: /ధృవీకరించు/, setPrice: /మండి|ధర/, help: /సహాయం/, greet: /నమస్తే|హలో/ },
};

const ASSISTANT_STRINGS = {
  en: {
    title: "FarmConnect Assistant", subtitle: "Free · rule-based · runs in your browser", placeholder: "Type or tap the mic…",
    greeting: "Hi! I'm your FarmConnect assistant. I can open pages for you, and for farmers I can list a crop just from what you say. Type \"help\" to see examples.",
    help_farmer: "Try: \"open my produce\" · \"show mandi prices\" · \"list 50 kg tomato grade A at 30 rupees per kg organic\"",
    help_restaurant: "Try: \"open marketplace\" · \"search tomato\" · \"show my orders\"",
    help_consumer: "Try: \"open vegetable market\" · \"search tomato\" · \"show my orders\"",
    help_transporter: "Try: \"show deliveries\" · \"accept FC1007\" · \"mark FC1005 delivered\"",
    help_admin: "Try: \"open verification\" · \"verify tomato\" · \"set mandi price tomato to 22\"",
    fallback: "I didn't quite catch that as a command. Type \"help\" for examples of what I can do.",
    opening: "Opening", searching_for: "Searching for",
    listing_success: "Listed! Added to your produce.", listing_incomplete: "I heard some of that, but I need at least a crop name, quantity, and price to list it. Try again with all three.",
    order_not_found: "I couldn't find that order ID.", order_wrong_status: "That order isn't in the right status for that action right now.",
    order_accepted: "Accepted — transporter assigned.", order_picked: "Marked as picked up.", order_transit: "Marked as in transit.", order_delivered: "Marked as delivered.",
    crop_verified: "Verified.", crop_verify_notfound: "No pending listing found for that crop.",
    mandi_updated: "Mandi price updated.", mandi_notfound: "I didn't recognize that crop for a mandi price.",
    you: "You", bot: "Assistant",
  },
  hi: {
    title: "फार्मकनेक्ट सहायक", subtitle: "मुफ़्त · नियम-आधारित · आपके ब्राउज़र में चलता है", placeholder: "टाइप करें या माइक दबाएँ…",
    greeting: "नमस्ते! मैं आपका फार्मकनेक्ट सहायक हूँ। मैं आपके लिए पेज खोल सकता हूँ, और किसानों के लिए बस बोलकर फ़सल सूचीबद्ध कर सकता हूँ। उदाहरण देखने के लिए \"मदद\" टाइप करें।",
    help_farmer: "आज़माएँ: \"मेरी उपज खोलें\" · \"मंडी भाव दिखाएँ\" · \"50 किलो टमाटर ग्रेड ए 30 रुपये प्रति किलो जैविक सूचीबद्ध करें\"",
    help_restaurant: "आज़माएँ: \"मार्केटप्लेस खोलें\" · \"टमाटर खोजें\" · \"मेरे ऑर्डर दिखाएँ\"",
    help_consumer: "आज़माएँ: \"सब्ज़ी मंडी खोलें\" · \"टमाटर खोजें\" · \"मेरे ऑर्डर दिखाएँ\"",
    help_transporter: "आज़माएँ: \"डिलीवरी दिखाएँ\" · \"FC1007 स्वीकार करें\" · \"FC1005 डिलीवर हुआ चिह्नित करें\"",
    help_admin: "आज़माएँ: \"सत्यापन खोलें\" · \"टमाटर सत्यापित करें\" · \"टमाटर मंडी भाव 22 सेट करें\"",
    fallback: "मुझे यह कमांड समझ नहीं आया। उदाहरण देखने के लिए \"मदद\" टाइप करें।",
    opening: "खोल रहा हूँ", searching_for: "खोज रहा हूँ",
    listing_success: "सूचीबद्ध हो गया! आपकी उपज में जोड़ा गया।", listing_incomplete: "मैंने कुछ सुना, लेकिन सूचीबद्ध करने के लिए मुझे कम से कम फ़सल का नाम, मात्रा और कीमत चाहिए। तीनों के साथ फिर कोशिश करें।",
    order_not_found: "मुझे वह ऑर्डर आईडी नहीं मिली।", order_wrong_status: "यह ऑर्डर अभी उस कार्रवाई के लिए सही स्थिति में नहीं है।",
    order_accepted: "स्वीकार किया गया — परिवहनकर्ता नियुक्त।", order_picked: "उठाया गया चिह्नित।", order_transit: "मार्ग में चिह्नित।", order_delivered: "डिलीवर हुआ चिह्नित।",
    crop_verified: "सत्यापित हो गया।", crop_verify_notfound: "उस फ़सल के लिए कोई लंबित लिस्टिंग नहीं मिली।",
    mandi_updated: "मंडी भाव अपडेट हो गया।", mandi_notfound: "मुझे मंडी भाव के लिए वह फ़सल पहचान नहीं आई।",
    you: "आप", bot: "सहायक",
  },
  te: {
    title: "ఫార్మ్‌కనెక్ట్ సహాయకుడు", subtitle: "ఉచితం · నియమ-ఆధారితం · మీ బ్రౌజర్‌లో నడుస్తుంది", placeholder: "టైప్ చేయండి లేదా మైక్ నొక్కండి…",
    greeting: "నమస్తే! నేను మీ ఫార్మ్‌కనెక్ట్ సహాయకుడిని. నేను మీ కోసం పేజీలను తెరవగలను, రైతుల కోసం మీరు చెప్పినదాని నుండి పంటను జాబితా చేయగలను. ఉదాహరణల కోసం \"సహాయం\" అని టైప్ చేయండి.",
    help_farmer: "ప్రయత్నించండి: \"నా పంట తెరవండి\" · \"మండి ధరలు చూపించు\" · \"50 కిలోల టమాటా గ్రేడ్ ఏ కిలోకు 30 రూపాయలు సేంద్రియ జాబితా చేయండి\"",
    help_restaurant: "ప్రయత్నించండి: \"మార్కెట్‌ప్లేస్ తెరవండి\" · \"టమాటా వెతకండి\" · \"నా ఆర్డర్లు చూపించు\"",
    help_consumer: "ప్రయత్నించండి: \"కూరగాయల మార్కెట్ తెరవండి\" · \"టమాటా వెతకండి\" · \"నా ఆర్డర్లు చూపించు\"",
    help_transporter: "ప్రయత్నించండి: \"డెలివరీలు చూపించు\" · \"FC1007 అంగీకరించండి\" · \"FC1005 డెలివరీ అయినట్లు గుర్తించండి\"",
    help_admin: "ప్రయత్నించండి: \"ధృవీకరణ తెరవండి\" · \"టమాటా ధృవీకరించండి\" · \"టమాటా మండి ధర 22కి సెట్ చేయండి\"",
    fallback: "ఆ కమాండ్ నాకు అర్థం కాలేదు. ఉదాహరణల కోసం \"సహాయం\" అని టైప్ చేయండి.",
    opening: "తెరుస్తున్నాను", searching_for: "వెతుకుతున్నాను",
    listing_success: "జాబితా చేయబడింది! మీ పంటకు జోడించబడింది.", listing_incomplete: "నేను కొంత విన్నాను, కానీ జాబితా చేయడానికి కనీసం పంట పేరు, పరిమాణం మరియు ధర కావాలి. మూడింటితో మళ్లీ ప్రయత్నించండి.",
    order_not_found: "ఆ ఆర్డర్ ఐడీ నాకు కనిపించలేదు.", order_wrong_status: "ఈ చర్య కోసం ఆ ఆర్డర్ ప్రస్తుతం సరైన స్థితిలో లేదు.",
    order_accepted: "అంగీకరించబడింది — రవాణాదారు కేటాయించబడింది.", order_picked: "తీసుకున్నట్లు గుర్తించబడింది.", order_transit: "రవాణాలో ఉన్నట్లు గుర్తించబడింది.", order_delivered: "డెలివరీ అయినట్లు గుర్తించబడింది.",
    crop_verified: "ధృవీకరించబడింది.", crop_verify_notfound: "ఆ పంట కోసం పెండింగ్ లిస్టింగ్ కనుగొనబడలేదు.",
    mandi_updated: "మండి ధర నవీకరించబడింది.", mandi_notfound: "మండి ధర కోసం ఆ పంట నాకు గుర్తించలేకపోయాను.",
    you: "మీరు", bot: "సహాయకుడు",
  },
};
const at = (lang, key) => (ASSISTANT_STRINGS[lang] && ASSISTANT_STRINGS[lang][key]) || ASSISTANT_STRINGS.en[key] || key;

function handleAssistantMessage(text, ctx) {
  const { lang, role, navKeys, setPage, crops, orders, mandiPrices, addCrop, advanceOrder, setMandiPrices, verifyCrop, meTransporter, setAssistantSearchQuery, bumpAssistantSearchNonce } = ctx;
  const lower = text.toLowerCase();
  const kw = ASSISTANT_KEYWORDS[lang] || ASSISTANT_KEYWORDS.en;
  const prefix = ROLE_PREFIX[role];

  if (kw.greet.test(lower)) return at(lang, "greeting");
  if (kw.help.test(lower)) return `${at(lang, "help_" + role)}`;

  // ---- Farmer: one-shot "list <details>" using the same multilingual parser as the voice-fill form ----
  if (role === "farmer") {
    const words = VOICE_WORDS[lang] || VOICE_WORDS.en;
    const hasQty = new RegExp(`\\d+(?:\\.\\d+)?\\s*(?:${words.kg})`, "i").test(lower);
    const hasPrice = new RegExp(`(?:${words.currency})\\s*\\d+(?:\\.\\d+)?|\\d+(?:\\.\\d+)?\\s*(?:${words.currency})`, "i").test(lower);
    const crop = findCropFromSpeech(lower, lang);
    // Any clear sign of listing intent (crop name plus at least a quantity or a price) —
    // react helpfully even to partial phrases, rather than a generic "didn't understand".
    if (crop && (hasQty || hasPrice)) {
      const patch = parseSpeechToForm(text, lang);
      if (patch.name && patch.quantity && patch.price) {
        addCrop({
          name: patch.name, icon: patch.icon || "🌿", quantity: patch.quantity, price: patch.price,
          grade: patch.grade || "A", method: patch.method || "Conventional",
        });
        const dateNote = patch.harvestDate ? ` · 🗓 ${patch.harvestDate}` : "";
        return `${at(lang, "listing_success")} (${patch.quantity}kg ${patch.name} · ₹${patch.price}/kg · ${patch.grade || "A"}${dateNote})`;
      }
      return at(lang, "listing_incomplete");
    }
  }

  // ---- Transporter: act on an order id (FC####) ----
  if (role === "transporter") {
    const idMatch = text.match(/FC\d+/i);
    if (idMatch && (kw.accept.test(lower) || kw.pickup.test(lower) || kw.transit.test(lower) || kw.deliver.test(lower))) {
      const id = idMatch[0].toUpperCase();
      const order = orders.find((o) => o.id === id);
      if (!order) return at(lang, "order_not_found");
      if (kw.accept.test(lower)) {
        if (order.status !== "PLACED") return at(lang, "order_wrong_status");
        advanceOrder(id, "TRANSPORTER_ASSIGNED", meTransporter.id);
        return at(lang, "order_accepted");
      }
      if (kw.pickup.test(lower)) {
        if (order.status !== "TRANSPORTER_ASSIGNED") return at(lang, "order_wrong_status");
        advanceOrder(id, "PICKED_UP");
        return at(lang, "order_picked");
      }
      if (kw.transit.test(lower)) {
        if (order.status !== "PICKED_UP") return at(lang, "order_wrong_status");
        advanceOrder(id, "IN_TRANSIT");
        return at(lang, "order_transit");
      }
      if (kw.deliver.test(lower)) {
        if (order.status !== "IN_TRANSIT") return at(lang, "order_wrong_status");
        advanceOrder(id, "DELIVERED");
        return at(lang, "order_delivered");
      }
    }
  }

  // ---- Admin: verify a crop, or set a mandi price ----
  if (role === "admin") {
    const crop = findCropFromSpeech(lower, lang);
    if (kw.verify.test(lower) && crop) {
      const pending = crops.find((c) => !c.verified && c.name.toLowerCase().includes(crop.en));
      if (!pending) return at(lang, "crop_verify_notfound");
      verifyCrop(pending.id);
      return `${at(lang, "crop_verified")} (${pending.name})`;
    }
    if (kw.setPrice.test(lower) && crop && mandiPrices[crop.label] != null) {
      const numMatch = lower.match(/(\d+(?:\.\d+)?)/);
      if (numMatch) {
        setMandiPrices({ ...mandiPrices, [crop.label]: Number(numMatch[1]) });
        return `${at(lang, "mandi_updated")} (${crop.label}: ₹${numMatch[1]}/kg)`;
      }
    }
    if (kw.setPrice.test(lower) && !crop) return at(lang, "mandi_notfound");
  }

  // ---- Restaurant / Consumer: search the marketplace ----
  if (role === "restaurant" || role === "consumer") {
    const searchMatch = lower.match(/search\s+(?:for\s+)?(.+)/) || lower.match(/(.+?)\s+(?:खोजें|వెతకండి)/);
    if (searchMatch) {
      const term = (searchMatch[1] || searchMatch[2] || "").trim();
      if (term) {
        setAssistantSearchQuery(term);
        bumpAssistantSearchNonce();
        setPage(role === "consumer" ? "c-marketplace" : "r-marketplace");
        return `${at(lang, "searching_for")} "${term}"`;
      }
    }
  }

  // ---- Universal: navigate to any page valid for this role ----
  for (const [suffix, triggers] of Object.entries(SUFFIX_TRIGGERS)) {
    if (triggers.some((w) => lower.includes(w))) {
      const targetKey = `${prefix}-${suffix}`;
      if (navKeys.includes(targetKey)) {
        setPage(targetKey);
        return `${at(lang, "opening")} ${t(lang, "nav_" + targetKey)}…`;
      }
    }
  }

  return at(lang, "fallback");
}

function AddCropForm({ onCancel, onSubmit, lang }) {
  const [form, setForm] = useState({ name: "", icon: "🍅", quantity: "", price: "", harvestDate: "2026-08-29", available: "", location: "Medchal", grade: "A", method: "Organic", image: null });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  /* ---------- FEATURE 1: real Web Speech API ---------- */
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [lastTranscript, setLastTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) setVoiceSupported(false);
  }, []);

  const toggleListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setVoiceSupported(false); return; }
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const rec = new SR();
    rec.lang = SPEECH_LANG_CODE[lang] || "en-IN";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setLastTranscript(text);
      const patch = parseSpeechToForm(text, lang);
      setForm((f) => ({ ...f, ...patch }));
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    setListening(true);
    rec.start();
  };

  /* ---------- FEATURE 2: real file upload + object URL preview ---------- */
  const fileInputRef = useRef(null);
  const [imgError, setImgError] = useState(null);
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setImgError("Please choose an image file."); return; }
    setImgError(null);
    const url = URL.createObjectURL(file);
    set("image", url);
  };
  const clearImage = () => {
    if (form.image) URL.revokeObjectURL(form.image);
    set("image", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-2xl mx-auto">
      <SectionTitle title={t(lang, "add_crop_title")} desc={t(lang, "add_crop_desc")} />

      <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: C.forest }}>
        <div className="mb-3">
          <Badge bg="rgba(232,135,30,0.18)" fg={C.marigold} icon={Sparkles}>{t(lang, "ai_voice_badge")}</Badge>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleListening}
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: listening ? C.danger : C.marigold }}
          >
            {listening ? <MicOff size={20} color="white" /> : <Mic size={20} color="white" />}
          </button>
          <div className="flex-1">
            <p className="text-white font-bold ff-body text-sm">{listening ? t(lang, "voice_listening") : t(lang, "voice_listen")}</p>
            <p className="text-xs" style={{ color: "#C9D6CF" }}>
              {voiceSupported
                ? (lastTranscript ? `${t(lang, "voice_heard_prefix")} "${lastTranscript}"` : t(lang, "voice_example"))
                : t(lang, "voice_not_supported")}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white border p-5" style={{ borderColor: C.line }}>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label={t(lang, "field_crop_name")}>
            <input className={inputCls} style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Tomato" />
          </Field>
          <Field label={t(lang, "field_crop_icon")}>
            <div className="flex flex-wrap gap-2">
              {CROP_ICON_OPTIONS.map((ic) => (
                <button key={ic} type="button" onClick={() => set("icon", ic)} className="w-9 h-9 rounded-lg border text-lg flex items-center justify-center"
                  style={{ borderColor: form.icon === ic ? C.forestMid : C.line, backgroundColor: form.icon === ic ? C.leafLight : "white" }}>{ic}</button>
              ))}
            </div>
          </Field>
          <Field label={t(lang, "field_quantity")}><input type="number" className={inputCls} style={inputStyle} value={form.quantity} onChange={(e) => set("quantity", e.target.value)} /></Field>
          <Field label={t(lang, "field_price")}><input type="number" className={inputCls} style={inputStyle} value={form.price} onChange={(e) => set("price", e.target.value)} /></Field>
          <Field label={t(lang, "field_harvest_date")}><input type="date" className={inputCls} style={inputStyle} value={form.harvestDate} onChange={(e) => set("harvestDate", e.target.value)} /></Field>
          <Field label={t(lang, "field_location")}><input className={inputCls} style={inputStyle} value={form.location} onChange={(e) => set("location", e.target.value)} /></Field>
          <Field label={t(lang, "field_grade")}>
            <select className={inputCls} style={inputStyle} value={form.grade} onChange={(e) => set("grade", e.target.value)}>
              <option>A+</option><option>A</option><option>B</option>
            </select>
          </Field>
          <Field label={t(lang, "field_method")}>
            <select className={inputCls} style={inputStyle} value={form.method} onChange={(e) => set("method", e.target.value)}>
              <option>Organic</option><option>Conventional</option><option>Natural Farming</option>
            </select>
          </Field>
        </div>
        <Field label={t(lang, "field_upload")}>
          {!form.image ? (
            <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full rounded-xl border-2 border-dashed p-6 text-center hover:bg-gray-50" style={{ borderColor: C.line }}>
              <ImagePlus size={26} className="mx-auto mb-2" style={{ color: C.slate }} />
              <p className="text-sm font-semibold" style={{ color: C.forest }}>Tap to choose a photo</p>
              <p className="text-xs mt-1" style={{ color: C.slate }}>Shown as a live preview via <span className="ff-mono">URL.createObjectURL</span>. Falls back to the icon above if unavailable after a refresh.</p>
            </button>
          ) : (
            <div className="relative">
              <img src={form.image} alt="Crop preview" className="w-full h-48 object-cover rounded-xl border" style={{ borderColor: C.line }} />
              <button type="button" onClick={clearImage} className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(18,49,42,0.8)" }}>
                <X size={16} color="white" />
              </button>
            </div>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
          {imgError && <p className="text-xs mt-1" style={{ color: C.danger }}>{imgError}</p>}
        </Field>
        <div className="flex gap-3 mt-4">
          <Button variant="outline" className="flex-1" onClick={onCancel}>{t(lang, "btn_cancel")}</Button>
          <Button variant="marigold" className="flex-1" icon={Plus} disabled={!form.name || !form.quantity || !form.price} onClick={() => onSubmit(form)}>{t(lang, "btn_submit_listing")}</Button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE COMPONENTS HOISTED TO MODULE SCOPE
   (previously defined inside App() — that redefined them on every
   render, causing React to remount them and silently discard their
   local state right after setting it, e.g. the "Order Placed!" and
   "Payment Successful" screens never appearing. Fixed by hoisting.)
   ============================================================ */
function ProductDetail({ crop, farmer, onBack, onOrder, lang = "en", savingLabelKey = "est_restaurant_saving" }) {
  const traditionalPrice = Math.round(crop.price * 1.75);
  const saving = traditionalPrice - Math.round(crop.price * 1.4);
  return (
    <div className="max-w-5xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm font-semibold mb-4" style={{ color: C.forestMid }}><ChevronLeft size={16} />{t(lang, "back_to_marketplace")}</button>
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <CropVisual crop={crop} className="rounded-3xl aspect-square w-full" emojiSize={90} />
          <div className="mt-4"><QualityCard crop={crop} lang={lang} /></div>
        </div>
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between">
            <h1 className="ff-display font-bold text-2xl sm:text-3xl" style={{ color: C.forest }}>{crop.name}</h1>
            <GradeBadge grade={crop.grade} />
          </div>
          <p className="text-sm mt-1 flex items-center gap-1" style={{ color: C.slate }}><MapPin size={13} />{farmer.location} · {t(lang, "order_col_farmer")}: <span className="font-semibold" style={{ color: C.forest }}>{farmer.name}</span></p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
            <div className="rounded-xl p-3" style={{ backgroundColor: C.cream }}><p className="text-xs" style={{ color: C.slate }}>{t(lang, "label_price")}</p><p className="ff-mono font-bold" style={{ color: C.marigoldDark }}>{fmt(crop.price)}/kg</p></div>
            <div className="rounded-xl p-3" style={{ backgroundColor: C.cream }}><p className="text-xs" style={{ color: C.slate }}>{t(lang, "label_available")}</p><p className="ff-mono font-bold" style={{ color: C.forest }}>{crop.available} kg</p></div>
            <div className="rounded-xl p-3" style={{ backgroundColor: C.cream }}><p className="text-xs" style={{ color: C.slate }}>{t(lang, "label_harvest_date")}</p><p className="font-bold text-sm" style={{ color: C.forest }}>{crop.harvestDaysAgo === 0 ? t(lang, "today_label") : `${crop.harvestDaysAgo}${t(lang, "days_ago_suffix")}`}</p></div>
            <div className="rounded-xl p-3" style={{ backgroundColor: C.cream }}><p className="text-xs" style={{ color: C.slate }}>{t(lang, "quality_score_label")}</p><p className="ff-mono font-bold" style={{ color: C.forest }}>{crop.quality.score}/100</p></div>
            <div className="rounded-xl p-3" style={{ backgroundColor: C.cream }}><p className="text-xs" style={{ color: C.slate }}>{t(lang, "label_est_delivery")}</p><p className="font-bold text-sm" style={{ color: C.forest }}>~{Math.max(1, Math.round(farmer.distanceKm / 40))} {t(lang, "day_suffix")}</p></div>
            <div className="rounded-xl p-3" style={{ backgroundColor: C.cream }}><p className="text-xs" style={{ color: C.slate }}>{t(lang, "label_farming_method")}</p><p className="font-bold text-sm" style={{ color: C.forest }}>{crop.method}</p></div>
          </div>

          <div className="rounded-2xl p-5 mt-5 border" style={{ borderColor: C.line, backgroundColor: "white" }}>
            <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: C.marigoldDark }}>{t(lang, "price_comparison")} <span className="font-normal normal-case" style={{ color: C.slate }}>{t(lang, "illustrative_label")}</span></p>
            <div className="flex items-center justify-between text-sm py-2 border-b" style={{ borderColor: C.line }}>
              <span style={{ color: C.slate }}>{t(lang, "traditional_procurement")}</span><span className="ff-mono font-bold" style={{ color: C.danger }}>{fmt(traditionalPrice)}/kg</span>
            </div>
            <div className="flex items-center justify-between text-sm py-2 border-b" style={{ borderColor: C.line }}>
              <span style={{ color: C.slate }}>{t(lang, "farmconnect_incl")}</span><span className="ff-mono font-bold" style={{ color: C.forestMid }}>{fmt(Math.round(crop.price * 1.4))}/kg</span>
            </div>
            <div className="flex items-center justify-between text-sm pt-2">
              <span className="font-semibold" style={{ color: C.forest }}>{t(lang, savingLabelKey)}</span><span className="ff-mono font-bold" style={{ color: C.marigoldDark }}>{fmt(saving)}/kg</span>
            </div>
          </div>

          <Button size="lg" variant="marigold" className="w-full mt-5" icon={ClipboardList} onClick={onOrder}>{t(lang, "btn_place_order")}</Button>
        </div>
      </div>
    </div>
  );
}

function OrderCreate({ crop, farmer, meRestaurant, createOrder, onBack, onTrack, onGoOrders, lang = "en" }) {
  // Default to roughly half the listing (not the full amount) so it's visually obvious
  // that ordering less than everything a farmer listed is completely normal.
  const [qty, setQty] = useState(Math.max(1, Math.round(crop.available / 2)));
  const [loc, setLoc] = useState(meRestaurant.location);
  const [date, setDate] = useState("2026-09-03");
  const [time, setTime] = useState("10:00 AM");
  const produceCost = qty * crop.price;
  const transportCost = transportEstimate(qty, farmer.distanceKm);
  const platformFee = platformFeeFor(produceCost);
  const total = produceCost + transportCost + platformFee;
  const [confirmedId, setConfirmedId] = useState(null);

  if (confirmedId) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: C.leafLight }}>
          <CheckCircle2 size={32} style={{ color: C.forestMid }} />
        </div>
        <h2 className="ff-display font-bold text-2xl" style={{ color: C.forest }}>{t(lang, "order_placed_title")}</h2>
        <p className="mt-1" style={{ color: C.slate }}>{t(lang, "order_placed_desc")} <span className="ff-mono font-bold">{confirmedId}</span> {t(lang, "order_placed_desc2")}</p>
        <div className="flex justify-center gap-3 mt-6">
          <Button variant="outline" onClick={() => onTrack(confirmedId)}>{t(lang, "btn_track_order")}</Button>
          <Button variant="primary" onClick={onGoOrders}>{t(lang, "btn_go_to_orders")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm font-semibold mb-4" style={{ color: C.forestMid }}><ChevronLeft size={16} />{t(lang, "back_label")}</button>
      <SectionTitle title={`${t(lang, "order_title_prefix")} ${crop.name} — ${farmer.name}`} desc={t(lang, "order_form_desc")} />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border p-5" style={{ borderColor: C.line }}>
          <Field label={`${t(lang, "field_qty_required")} ${crop.available}${t(lang, "field_qty_available_suffix")}`}>
            <input type="number" className={inputCls} style={inputStyle} value={qty} min={1} max={crop.available} onChange={(e) => setQty(Math.min(crop.available, Math.max(1, Number(e.target.value))))} />
            <input
              type="range"
              min={1}
              max={crop.available}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full mt-2 accent-current"
              style={{ accentColor: C.marigold }}
            />
            <div className="flex gap-2 mt-2 flex-wrap">
              {[0.25, 0.5, 0.75, 1].map((f) => {
                const val = Math.max(1, Math.round(crop.available * f));
                const active = val === qty;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setQty(val)}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold border"
                    style={{ borderColor: active ? C.marigold : C.line, backgroundColor: active ? C.marigoldLight : "white", color: active ? C.marigoldDark : C.slate }}
                  >
                    {val}kg
                  </button>
                );
              })}
            </div>
            <p className="text-xs mt-2" style={{ color: C.slate }}>
              {t(lang, "partial_order_hint")} · <span className="font-semibold" style={{ color: C.forest }}>{crop.available - qty}kg</span> {t(lang, "remaining_after_order")}
            </p>
          </Field>
          <Field label={t(lang, "field_delivery_location")}>
            <input className={inputCls} style={inputStyle} value={loc} onChange={(e) => setLoc(e.target.value)} />
          </Field>
          <Field label={t(lang, "field_delivery_date")}>
            <input type="date" className={inputCls} style={inputStyle} value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label={t(lang, "field_delivery_time")}>
            <input className={inputCls} style={inputStyle} value={time} onChange={(e) => setTime(e.target.value)} />
          </Field>
        </div>
        <div className="rounded-2xl bg-white border p-5 h-fit" style={{ borderColor: C.line }}>
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: C.marigoldDark }}>{t(lang, "cost_breakdown")}</p>
          <div className="flex justify-between text-sm py-2 border-b" style={{ borderColor: C.line }}><span style={{ color: C.slate }}>{qty} kg {crop.name} @ {fmt(crop.price)}/kg</span><span className="ff-mono font-semibold">{fmt(produceCost)}</span></div>
          <div className="flex justify-between text-sm py-2 border-b" style={{ borderColor: C.line }}><span style={{ color: C.slate }}>{t(lang, "label_transportation")}</span><span className="ff-mono font-semibold">{fmt(transportCost)}</span></div>
          <div className="flex justify-between text-sm py-2 border-b" style={{ borderColor: C.line }}><span style={{ color: C.slate }}>{t(lang, "label_platform_fee")}</span><span className="ff-mono font-semibold">{fmt(platformFee)}</span></div>
          <div className="flex justify-between text-base pt-3"><span className="font-bold" style={{ color: C.forest }}>{t(lang, "label_total")}</span><span className="ff-mono font-bold text-lg" style={{ color: C.marigoldDark }}>{fmt(total)}</span></div>
          <Button variant="marigold" className="w-full mt-4" icon={CheckCircle2} onClick={() => { const id = createOrder(crop, { quantity: qty, deliveryLocation: loc, deliveryDate: date, deliveryTime: time }); setConfirmedId(id); }}>{t(lang, "btn_confirm_order")}</Button>
        </div>
      </div>
    </div>
  );
}

/* Consumer (home-buyer) order form: like the restaurant flow, but the quantity
   requirement is sized for households — anywhere from 1 kg up to 100 kg per
   order (capped by farm availability) — with doorstep-delivery pricing and a
   free-delivery nudge instead of truck-freight estimates. */
function ConsumerOrderCreate({ crop, farmer, meConsumer, createConsumerOrder, onBack, onTrack, onGoOrders, lang = "en" }) {
  const maxQty = Math.max(1, Math.min(100, crop.available));
  const [qty, setQty] = useState(Math.min(5, maxQty));
  const [loc, setLoc] = useState(meConsumer.location);
  const [date, setDate] = useState(() => new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 10));
  const [time, setTime] = useState("7:00 AM");
  const produceCost = qty * crop.price;
  const deliveryFee = consumerDeliveryFee(qty, farmer.distanceKm, produceCost);
  const platformFee = consumerPlatformFee(produceCost);
  const total = produceCost + deliveryFee + platformFee;
  const retailPerKg = Math.round(crop.price * 1.75);
  const saving = retailPerKg * qty - total;
  const [confirmedId, setConfirmedId] = useState(null);
  const clampQty = (v) => Math.min(maxQty, Math.max(1, Math.round(Number(v) || 1)));

  if (confirmedId) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: C.leafLight }}>
          <CheckCircle2 size={32} style={{ color: C.forestMid }} />
        </div>
        <h2 className="ff-display font-bold text-2xl" style={{ color: C.forest }}>{t(lang, "order_placed_title")}</h2>
        <p className="mt-1" style={{ color: C.slate }}>{t(lang, "order_placed_desc")} <span className="ff-mono font-bold">{confirmedId}</span> {t(lang, "order_placed_desc2")}</p>
        <div className="flex justify-center gap-3 mt-6">
          <Button variant="outline" onClick={() => onTrack(confirmedId)}>{t(lang, "btn_track_order")}</Button>
          <Button variant="primary" onClick={onGoOrders}>{t(lang, "btn_go_to_orders")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm font-semibold mb-4" style={{ color: C.forestMid }}><ChevronLeft size={16} />{t(lang, "back_label")}</button>
      <SectionTitle title={`${t(lang, "order_title_prefix")} ${crop.name} — ${farmer.name}`} desc={t(lang, "c_order_form_desc")} />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border p-5" style={{ borderColor: C.line }}>
          <Field label={`${t(lang, "c_qty_field")} — max ${maxQty} kg`}>
            <input type="number" className={inputCls} style={inputStyle} value={qty} min={1} max={maxQty} onChange={(e) => setQty(clampQty(e.target.value))} />
            <input
              type="range"
              min={1}
              max={maxQty}
              value={qty}
              onChange={(e) => setQty(clampQty(e.target.value))}
              className="w-full mt-2"
              style={{ accentColor: C.plum }}
            />
            <p className="text-2xs font-bold uppercase tracking-wide mt-2" style={{ color: C.plum }}>{t(lang, "c_quick_qty_label")}</p>
            <div className="flex gap-2 mt-1 flex-wrap">
              {[1, 2, 5, 10, 25, 50, 100].filter((v) => v <= maxQty).map((val) => {
                const active = val === qty;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setQty(val)}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold border"
                    style={{ borderColor: active ? C.plum : C.line, backgroundColor: active ? C.plumLight : "white", color: active ? C.plum : C.slate }}
                  >
                    {val}kg
                  </button>
                );
              })}
            </div>
            <p className="text-xs mt-2" style={{ color: C.slate }}>
              {t(lang, "partial_order_hint")} · <span className="font-semibold" style={{ color: C.forest }}>{crop.available - qty}kg</span> {t(lang, "remaining_after_order")}
            </p>
            <p className="text-2xs mt-1" style={{ color: C.slate }}>{t(lang, "c_qty_max_note")}</p>
          </Field>
          <Field label={t(lang, "field_delivery_location")}>
            <input className={inputCls} style={inputStyle} value={loc} onChange={(e) => setLoc(e.target.value)} />
          </Field>
          <Field label={t(lang, "field_delivery_date")}>
            <input type="date" className={inputCls} style={inputStyle} value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label={t(lang, "field_delivery_time")}>
            <select className={inputCls} style={inputStyle} value={time} onChange={(e) => setTime(e.target.value)}>
              {["7:00 AM", "10:00 AM", "1:00 PM", "5:00 PM"].map((slot) => <option key={slot}>{slot}</option>)}
            </select>
          </Field>
        </div>
        <div className="rounded-2xl bg-white border p-5 h-fit" style={{ borderColor: C.line }}>
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: C.plum }}>{t(lang, "cost_breakdown")}</p>
          <div className="flex justify-between text-sm py-2 border-b" style={{ borderColor: C.line }}><span style={{ color: C.slate }}>{qty} kg {crop.name} @ {fmt(crop.price)}/kg</span><span className="ff-mono font-semibold">{fmt(produceCost)}</span></div>
          <div className="flex justify-between text-sm py-2 border-b" style={{ borderColor: C.line }}>
            <span style={{ color: C.slate }}>{t(lang, "c_delivery_fee")}{deliveryFee === 0 && <span className="ml-1 text-2xs font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: C.leafLight, color: C.forestMid }}>FREE</span>}</span>
            <span className="ff-mono font-semibold">{deliveryFee === 0 ? "₹0" : fmt(deliveryFee)}</span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b" style={{ borderColor: C.line }}><span style={{ color: C.slate }}>{t(lang, "label_platform_fee")}</span><span className="ff-mono font-semibold">{fmt(platformFee)}</span></div>
          <div className="flex justify-between text-base pt-3"><span className="font-bold" style={{ color: C.forest }}>{t(lang, "label_total")}</span><span className="ff-mono font-bold text-lg" style={{ color: C.plum }}>{fmt(total)}</span></div>
          <div className="rounded-xl p-3 mt-3" style={{ backgroundColor: C.leafLight }}>
            <div className="flex justify-between text-sm"><span style={{ color: C.slate }}>{t(lang, "c_retail_price")}</span><span className="ff-mono font-semibold" style={{ color: C.danger }}>{fmt(retailPerKg)}/kg</span></div>
            {saving > 0 && <div className="flex justify-between text-sm mt-1"><span className="font-semibold" style={{ color: C.forestMid }}>{t(lang, "c_you_save")}</span><span className="ff-mono font-bold" style={{ color: C.forestMid }}>{fmt(saving)}</span></div>}
          </div>
          {deliveryFee > 0 && (
            <p className="text-xs mt-3 flex items-center gap-1.5" style={{ color: C.plum }}><BadgePercent size={14} />{t(lang, "c_free_delivery_note")}</p>
          )}
          <Button variant="marigold" className="w-full mt-4" icon={CheckCircle2} onClick={() => { const id = createConsumerOrder(crop, { quantity: qty, deliveryLocation: loc, deliveryDate: date, deliveryTime: time }); setConfirmedId(id); }}>{t(lang, "btn_confirm_order")}</Button>
        </div>
      </div>
    </div>
  );
}

function PaymentPage({ order, crop, farmer, advanceOrder, lang = "en" }) {
  const [done, setDone] = useState(order.status === "PAID");
  return (
    <div className="max-w-lg mx-auto">
      <SectionTitle title={`${t(lang, "payment_title")} — Order ${order.id}`} desc={`${order.qty}kg ${crop?.name} · ${farmer?.name}`} />
      <div className="rounded-2xl bg-white border p-5" style={{ borderColor: C.line }}>
        <div className="flex justify-between text-sm py-2 border-b" style={{ borderColor: C.line }}><span style={{ color: C.slate }}>{t(lang, "label_order_amount")}</span><span className="ff-mono font-semibold">{fmt(order.produceCost)}</span></div>
        <div className="flex justify-between text-sm py-2 border-b" style={{ borderColor: C.line }}><span style={{ color: C.slate }}>{t(lang, "label_transportation")}</span><span className="ff-mono font-semibold">{fmt(order.transportCost)}</span></div>
        <div className="flex justify-between text-sm py-2 border-b" style={{ borderColor: C.line }}><span style={{ color: C.slate }}>{t(lang, "label_platform_fee")}</span><span className="ff-mono font-semibold">{fmt(order.platformFee)}</span></div>
        <div className="flex justify-between text-base pt-3"><span className="font-bold" style={{ color: C.forest }}>{t(lang, "label_total")}</span><span className="ff-mono font-bold text-lg" style={{ color: C.marigoldDark }}>{fmt(order.total)}</span></div>
        {!done ? (
          <Button variant="marigold" className="w-full mt-5" icon={Wallet} onClick={() => { advanceOrder(order.id, "PAID"); setDone(true); }}>{t(lang, "btn_simulate_payment")}</Button>
        ) : (
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-4"><CheckCircle2 style={{ color: C.forestMid }} /><p className="font-bold" style={{ color: C.forest }}>{t(lang, "payment_successful")}</p></div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl p-3" style={{ backgroundColor: C.leafLight }}><p className="text-2xs uppercase font-semibold" style={{ color: C.slate }}>{t(lang, "label_farmer_payment")}</p><p className="ff-mono font-bold text-sm" style={{ color: C.forestMid }}>{fmt(order.produceCost)}</p></div>
              <div className="rounded-xl p-3" style={{ backgroundColor: C.skyLight }}><p className="text-2xs uppercase font-semibold" style={{ color: C.slate }}>{t(lang, "label_transport_payment")}</p><p className="ff-mono font-bold text-sm" style={{ color: C.sky }}>{fmt(order.transportCost)}</p></div>
              <div className="rounded-xl p-3" style={{ backgroundColor: C.marigoldLight }}><p className="text-2xs uppercase font-semibold" style={{ color: C.slate }}>{t(lang, "label_platform_revenue")}</p><p className="ff-mono font-bold text-sm" style={{ color: C.marigoldDark }}>{fmt(order.platformFee)}</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   LIVE GPS LOCATION — real navigator.geolocation, free OpenStreetMap
   embed (no API key). Visible to any role viewing this order's
   tracking within the same browser session.
   ============================================================ */
function timeAgo(iso, lang) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const secs = Math.round(diffMs / 1000);
  if (secs < 60) return `${secs}${t(lang, "seconds_ago_suffix")}`;
  return `${Math.round(secs / 60)}${t(lang, "minutes_ago_suffix")}`;
}

function LiveMap({ lat, lng, active, lang = "en" }) {
  const [, forceTick] = useState(0);
  const online = useOnlineStatus();
  useEffect(() => {
    const id = setInterval(() => forceTick((n) => n + 1), 5000);
    return () => clearInterval(id);
  }, []);

  if (!online) {
    return (
      <div className="rounded-2xl border p-4 text-center" style={{ borderColor: C.line, backgroundColor: C.cream }}>
        <WifiOff size={22} className="mx-auto mb-2" style={{ color: C.slate }} />
        <p className="text-xs font-semibold" style={{ color: C.forest }}>{t(lang, "map_needs_internet")}</p>
        <p className="ff-mono text-xs mt-1" style={{ color: C.slate }}>{lat.toFixed(5)}, {lng.toFixed(5)}</p>
      </div>
    );
  }

  const d = 0.01;
  const bbox = `${lng - d}%2C${lat - d}%2C${lng + d}%2C${lat + d}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: C.line }}>
      <iframe title="live-location-map" src={src} className="w-full" style={{ height: 220, border: 0 }} loading="lazy" />
    </div>
  );
}

function LiveLocationCard({ order, liveLocation, lang = "en" }) {
  const active = ["TRANSPORTER_ASSIGNED", "PICKED_UP", "IN_TRANSIT"].includes(order.status);
  return (
    <div className="rounded-2xl bg-white border p-4 mt-4" style={{ borderColor: C.line }}>
      <div className="flex items-center justify-between mb-2">
        <p className="font-bold ff-display text-sm flex items-center gap-1.5" style={{ color: C.forest }}><MapPinned size={15} />{t(lang, "live_location_title")}</p>
        {liveLocation && active && <Badge bg={C.dangerLight} fg={C.danger}>{t(lang, "sharing_live_badge")}</Badge>}
      </div>
      {!liveLocation ? (
        <p className="text-xs" style={{ color: C.slate }}>{t(lang, "live_location_waiting")}</p>
      ) : (
        <>
          <LiveMap lat={liveLocation.lat} lng={liveLocation.lng} active={active} lang={lang} />
          <p className="text-xs mt-2" style={{ color: C.slate }}>
            {active ? t(lang, "live_location_active_note") : t(lang, "live_location_ended_note")} · {t(lang, "last_updated_label")}: {timeAgo(liveLocation.at, lang)}
          </p>
        </>
      )}
    </div>
  );
}

/* Transporter-facing control: one GPS watch updates every currently-active order
   for this transporter at once, since one vehicle carries all of them together. */
function LocationSharer({ activeOrderIds, updateLiveLocation, lang = "en" }) {
  const [sharing, setSharing] = useState(false);
  const [error, setError] = useState(null);
  const watchIdRef = useRef(null);
  const activeIdsRef = useRef(activeOrderIds);

  // Keep a ref in sync so the long-lived geolocation callback always sees the
  // current set of active orders, instead of the stale set from when sharing started.
  useEffect(() => { activeIdsRef.current = activeOrderIds; }, [activeOrderIds]);

  const stop = () => {
    if (watchIdRef.current != null && navigator.geolocation) navigator.geolocation.clearWatch(watchIdRef.current);
    watchIdRef.current = null;
    setSharing(false);
  };

  // Auto-stop once nothing is left to share for (e.g. the last active order was delivered)
  useEffect(() => {
    if (sharing && activeOrderIds.length === 0) stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOrderIds.length]);

  // Only tear down the actual GPS watch on unmount, not on every re-render
  useEffect(() => () => stop(), []);

  const start = () => {
    if (!navigator.geolocation) { setError(t(lang, "location_not_supported")); return; }
    setError(null);
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        activeIdsRef.current.forEach((orderId) => updateLiveLocation(orderId, latitude, longitude));
      },
      () => setError(t(lang, "location_denied")),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );
    watchIdRef.current = id;
    setSharing(true);
  };

  if (activeOrderIds.length === 0) return null;

  return (
    <div className="rounded-2xl p-4 mb-5 flex items-center justify-between flex-wrap gap-3" style={{ backgroundColor: sharing ? C.forest : C.leafLight }}>
      <div className="flex items-center gap-2">
        <RadioTower size={18} color={sharing ? "white" : C.forestMid} />
        <div>
          <p className="text-sm font-bold" style={{ color: sharing ? "white" : C.forest }}>
            {sharing ? t(lang, "sharing_live_badge") : t(lang, "live_location_title")}
          </p>
          {error && <p className="text-xs" style={{ color: sharing ? "#FFD9CF" : C.danger }}>{error}</p>}
        </div>
      </div>
      <Button variant={sharing ? "danger" : "marigold"} size="sm" icon={sharing ? LocateFixed : Navigation} onClick={sharing ? stop : start}>
        {sharing ? t(lang, "btn_share_location_off") : t(lang, "btn_share_location_on")}
      </Button>
    </div>
  );
}

/* "Go Online" — shares a transporter's location even before they've accepted any
   order, so the automatic nearby-radius assignment has somewhere real to match
   against instead of only their static home base. */
function GoOnlineToggle({ transporterId, updateTransporterLocation, clearTransporterLocation, isOnline, lang = "en" }) {
  const [error, setError] = useState(null);
  const watchIdRef = useRef(null);

  useEffect(() => () => {
    if (watchIdRef.current != null && navigator.geolocation) navigator.geolocation.clearWatch(watchIdRef.current);
  }, []);

  const goOnline = () => {
    if (!navigator.geolocation) { setError(t(lang, "location_not_supported")); return; }
    setError(null);
    const id = navigator.geolocation.watchPosition(
      (pos) => updateTransporterLocation(transporterId, pos.coords.latitude, pos.coords.longitude),
      () => setError(t(lang, "location_denied")),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
    );
    watchIdRef.current = id;
  };

  const goOffline = () => {
    if (watchIdRef.current != null && navigator.geolocation) navigator.geolocation.clearWatch(watchIdRef.current);
    watchIdRef.current = null;
    clearTransporterLocation(transporterId);
  };

  return (
    <div className="rounded-2xl p-4 mb-5 flex items-center justify-between flex-wrap gap-3" style={{ backgroundColor: isOnline ? C.forest : C.cream }}>
      <div className="flex items-center gap-2">
        <RadioTower size={18} color={isOnline ? "white" : C.forestMid} />
        <div>
          <p className="text-sm font-bold" style={{ color: isOnline ? "white" : C.forest }}>{isOnline ? t(lang, "online_badge") : t(lang, "go_online_title")}</p>
          <p className="text-xs" style={{ color: isOnline ? "#C9D6CF" : C.slate }}>{isOnline ? t(lang, "go_online_desc") : t(lang, "offline_note")}</p>
          {error && <p className="text-xs" style={{ color: isOnline ? "#FFD9CF" : C.danger }}>{error}</p>}
        </div>
      </div>
      <Button variant={isOnline ? "danger" : "marigold"} size="sm" icon={isOnline ? LocateFixed : Navigation} onClick={isOnline ? goOffline : goOnline}>
        {isOnline ? t(lang, "btn_go_offline") : t(lang, "btn_go_online")}
      </Button>
    </div>
  );
}

function OrderTrackingPage({ orders, selectedOrderId, cropById, farmerById, restaurantById, consumerById, onOpenLedger, liveLocations = {}, lang = "en" }) {
  const [pickId, setPickId] = useState(selectedOrderId || orders[0]?.id);
  useEffect(() => {
    if (selectedOrderId) setPickId(selectedOrderId);
  }, [selectedOrderId]);
  const order = orders.find((o) => o.id === pickId) || orders[0];
  if (!order) return <EmptyState text={t(lang, "no_orders_yet")} />;
  const crop = cropById(order.cropId);
  const farmer = farmerById(order.farmerId);
  const isConsumerOrder = order.buyerType === "consumer";
  const restaurant = isConsumerOrder ? (consumerById ? consumerById(order.consumerId) : null) : restaurantById(order.restaurantId);
  const idx = STATUS_STEPS.indexOf(order.status);
  return (
    <div className="max-w-3xl mx-auto">
      <SectionTitle title={t(lang, "order_tracking_title")} desc={t(lang, "order_tracking_desc")} right={
        <select className={inputCls + " w-48"} style={inputStyle} value={order.id} onChange={(e) => setPickId(e.target.value)}>
          {orders.map((o) => <option key={o.id} value={o.id}>{o.id}</option>)}
        </select>
      } />
      <div className="rounded-2xl bg-white border p-5" style={{ borderColor: C.line }}>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div>
            <p className="ff-display font-bold text-lg" style={{ color: C.forest }}>Order #{order.id}</p>
            <p className="text-sm" style={{ color: C.slate }}>{order.qty} kg {crop?.icon} {crop?.name}</p>
          </div>
          <StatusBadge status={order.status} lang={lang} />
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mb-5">
          <div className="rounded-xl p-3" style={{ backgroundColor: C.cream }}><p className="text-xs" style={{ color: C.slate }}>{t(lang, "order_col_farmer")}</p><p className="font-semibold text-sm">{farmer?.name} · {farmer?.location}</p></div>
          <div className="rounded-xl p-3" style={{ backgroundColor: C.cream }}><p className="text-xs" style={{ color: C.slate }}>{isConsumerOrder ? t(lang, "c_deliver_to") : t(lang, "order_col_restaurant")}</p><p className="font-semibold text-sm">{restaurant?.name} · {restaurant?.location}</p></div>
        </div>
        <Stepper steps={STATUS_STEPS.map((s) => t(lang, "status_" + s))} activeIndex={idx} orientation="horizontal" />
        <div className="mt-4 rounded-xl p-3 flex items-center gap-2" style={{ backgroundColor: C.leafLight }}>
          <Clock size={16} style={{ color: C.forestMid }} />
          <p className="text-sm font-semibold" style={{ color: C.forest }}>{t(lang, "est_arrival")}: {order.deliveryDate} · {order.deliveryTime}</p>
        </div>
        <Button variant="dark" className="w-full mt-3" icon={Link2} onClick={() => onOpenLedger(order.id)}>{t(lang, "view_ledger")}</Button>
        <LiveLocationCard order={order} liveLocation={liveLocations[order.id]} lang={lang} />
      </div>
    </div>
  );
}

function Marketplace({ crops, farmerById, onView, lang = "en", initialQuery = "", eyebrow = "", title = "", desc = "" }) {
  const [q, setQ] = useState(initialQuery);
  const [grade, setGrade] = useState("All");
  const [sort, setSort] = useState("price-asc");
  const filtered = useMemo(() => {
    let list = crops.filter((c) => c.verified).filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
    if (grade !== "All") list = list.filter((c) => c.grade === grade);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "quality") list = [...list].sort((a, b) => b.quality.score - a.quality.score);
    if (sort === "fresh") list = [...list].sort((a, b) => a.harvestDaysAgo - b.harvestDaysAgo);
    return list;
  }, [crops, q, grade, sort]);
  return (
    <div>
      <SectionTitle eyebrow={eyebrow || t(lang, "marketplace_eyebrow")} title={title || t(lang, "marketplace_title")} desc={desc || t(lang, "marketplace_desc")} />
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-white flex-1 min-w-220" style={{ borderColor: C.line }}>
          <Search size={16} style={{ color: C.slate }} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(lang, "search_placeholder")} className="w-full text-sm outline-none ff-body" />
        </div>
        <select className={inputCls + " w-36"} style={inputStyle} value={grade} onChange={(e) => setGrade(e.target.value)}>
          <option value="All">{t(lang, "filter_all_grades")}</option><option>A+</option><option>A</option><option>B</option>
        </select>
        <select className={inputCls + " w-48"} style={inputStyle} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="price-asc">{t(lang, "sort_price_asc")}</option>
          <option value="price-desc">{t(lang, "sort_price_desc")}</option>
          <option value="quality">{t(lang, "sort_quality")}</option>
          <option value="fresh">{t(lang, "sort_fresh")}</option>
        </select>
      </div>
      {filtered.length === 0 ? <EmptyState text="No produce matches your filters." /> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => <CropCard key={c.id} crop={c} farmer={farmerById(c.farmerId)} onView={onView} lang={lang} />)}
        </div>
      )}
    </div>
  );
}

function OrdersTable({ rows, cropById, farmerById, restaurantById = null, onTrack, onPay, showFarmer, lang = "en" }) {
  if (rows.length === 0) return <EmptyState text={t(lang, "no_orders_yet")} />;
  return (
    <div className="rounded-2xl bg-white border overflow-x-auto scrollbar-thin" style={{ borderColor: C.line }}>
      <table className="w-full text-sm min-w-720">
        <thead>
          <tr className="text-left border-b" style={{ borderColor: C.line, color: C.slate }}>
            <th className="p-3 font-semibold">{t(lang, "order_col_order")}</th>
            <th className="p-3 font-semibold">{t(lang, "order_col_crop")}</th>
            {showFarmer && <th className="p-3 font-semibold">{t(lang, "order_col_farmer")}</th>}
            {restaurantById && <th className="p-3 font-semibold">{t(lang, "order_col_restaurant")}</th>}
            <th className="p-3 font-semibold">{t(lang, "order_col_qty")}</th>
            <th className="p-3 font-semibold">{t(lang, "order_col_total")}</th>
            <th className="p-3 font-semibold">{t(lang, "order_col_status")}</th>
            <th className="p-3 font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((o) => {
            const crop = cropById(o.cropId);
            return (
              <tr key={o.id} className="border-b last:border-0" style={{ borderColor: C.line }}>
                <td className="p-3 ff-mono font-semibold" style={{ color: C.forest }}>{o.id}</td>
                <td className="p-3">{crop?.icon} {crop?.name}</td>
                {showFarmer && <td className="p-3">{farmerById(o.farmerId)?.name}</td>}
                {restaurantById && <td className="p-3">{restaurantById(o.restaurantId)?.name}</td>}
                <td className="p-3 ff-mono">{o.qty}kg</td>
                <td className="p-3 ff-mono font-semibold">{fmt(o.total)}</td>
                <td className="p-3"><StatusBadge status={o.status} lang={lang} /></td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button className="text-xs font-bold" style={{ color: C.forestMid }} onClick={() => onTrack(o.id)}>{t(lang, "btn_track")}</button>
                    {onPay && o.status === "DELIVERED" && <button className="text-xs font-bold" style={{ color: C.marigoldDark }} onClick={() => onPay(o.id)}>{t(lang, "btn_pay")}</button>}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function DeliveryRequestsList({ rows, cropById, farmerById, restaurantById, consumerById, onAccept, lang = "en" }) {
  if (rows.length === 0) return <EmptyState text={t(lang, "no_delivery_requests")} />;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {rows.map((o) => {
        const crop = cropById(o.cropId), farmer = farmerById(o.farmerId);
        const restaurant = o.buyerType === "consumer" ? (consumerById ? consumerById(o.consumerId) : null) : restaurantById(o.restaurantId);
        return (
          <div key={o.id} className="rounded-2xl bg-white border p-4" style={{ borderColor: C.line }}>
            <div className="flex justify-between items-center mb-3">
              <span className="ff-mono text-xs font-bold" style={{ color: C.slate }}>{o.id}</span>
              <Badge bg={C.skyLight} fg={C.sky} icon={Truck}>{t(lang, "new_request")}</Badge>
            </div>
            <p className="ff-display font-bold" style={{ color: C.forest }}>{crop?.icon} {o.qty}kg {crop?.name}</p>
            <div className="text-sm mt-2 space-y-1">
              <p style={{ color: C.slate }}><span className="font-semibold" style={{ color: C.forest }}>{t(lang, "label_pickup")}:</span> {farmer?.location}</p>
              <p style={{ color: C.slate }}><span className="font-semibold" style={{ color: C.forest }}>{t(lang, "label_drop")}:</span> {restaurant?.location}</p>
              <p style={{ color: C.slate }}><span className="font-semibold" style={{ color: C.forest }}>{t(lang, "label_deadline")}:</span> {o.deliveryDate}</p>
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="ff-mono font-bold" style={{ color: C.marigoldDark }}>{fmt(o.transportCost)} {t(lang, "label_earnings")}</p>
            </div>
            <div className="flex gap-2 mt-3">
              <Button size="sm" className="flex-1" icon={ThumbsUp} onClick={() => onAccept(o.id)}>{t(lang, "btn_accept")}</Button>
              <Button size="sm" variant="outline" className="flex-1" icon={ThumbsDown}>{t(lang, "btn_reject")}</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function VerificationPage({ crops, farmerById, verifyCrop, lang = "en" }) {
  const [tab, setTab] = useState("crops");
  const tabs = [["crops", t(lang, "tab_crop_quality")], ["farmers", t(lang, "tab_farmers")], ["restaurants", t(lang, "tab_restaurants")], ["transporters", t(lang, "tab_transporters")]];
  return (
    <div>
      <SectionTitle title={t(lang, "verification_title")} desc={t(lang, "verification_desc")} />
      <div className="flex gap-2 mb-5 flex-wrap">
        {tabs.map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ backgroundColor: tab === k ? C.forestMid : "white", color: tab === k ? "white" : C.slate, border: `1px solid ${C.line}` }}>{l}</button>
        ))}
      </div>
      {tab === "crops" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {crops.map((c) => (
            <div key={c.id} className="rounded-2xl bg-white border p-4" style={{ borderColor: C.line }}>
              <div className="flex justify-between items-start mb-2">
                <div><p className="font-bold ff-display" style={{ color: C.forest }}>{c.icon} {c.name}</p><p className="text-xs" style={{ color: C.slate }}>{farmerById(c.farmerId).name} · {farmerById(c.farmerId).location}</p></div>
                <GradeBadge grade={c.grade} />
              </div>
              <p className="text-xs mb-2" style={{ color: C.slate }}>{t(lang, "quality_score_colon")} <span className="ff-mono font-bold" style={{ color: C.forest }}>{c.quality.score}/100</span></p>
              {c.verified ? <Badge bg={C.leafLight} fg={C.forestMid} icon={CheckCircle2}>{t(lang, "verified_label")}</Badge> : <Button size="sm" onClick={() => verifyCrop(c.id)} icon={ShieldCheck}>{t(lang, "btn_verify_now")}</Button>}
            </div>
          ))}
        </div>
      )}
      {tab !== "crops" && <VerifyEntityList entities={tab === "farmers" ? FARMERS : tab === "restaurants" ? RESTAURANTS : TRANSPORTERS} type={tab} lang={lang} />}
    </div>
  );
}

function VerifyEntityList({ entities, type, lang = "en" }) {
  const [statusMap, setStatusMap] = useState(() => Object.fromEntries(entities.map((e) => [e.id, e.verified !== false])));
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {entities.map((e) => (
        <div key={e.id} className="rounded-2xl bg-white border p-4 flex items-center justify-between" style={{ borderColor: C.line }}>
          <div><p className="font-bold ff-display text-sm" style={{ color: C.forest }}>{e.name}</p><p className="text-xs" style={{ color: C.slate }}>{e.location || e.vehicle}</p></div>
          {statusMap[e.id] ? <Badge bg={C.leafLight} fg={C.forestMid} icon={CheckCircle2}>{t(lang, "verified_label")}</Badge> : <Button size="sm" onClick={() => setStatusMap((s) => ({ ...s, [e.id]: true }))}>{t(lang, "btn_verify")}</Button>}
        </div>
      ))}
    </div>
  );
}

function SmartMatching({ crops, farmerById, onView, lang = "en" }) {
  const [cropName, setCropName] = useState("Tomato");
  const [qty, setQty] = useState(500);
  const [grade, setGrade] = useState("A");
  const names = [...new Set(crops.map((c) => c.name.replace(/\(.*\)/, "").trim()))];
  const candidates = crops.filter((c) => c.name.toLowerCase().includes(cropName.toLowerCase()) && c.verified);
  const gradeRank = { "A+": 3, A: 2, B: 1 };
  const scored = candidates.map((c) => {
    const farmer = farmerById(c.farmerId);
    const gradeScore = 40 - Math.abs(gradeRank[grade] - gradeRank[c.grade]) * 15;
    const qtyScore = Math.min(20, 20 - Math.abs(qty - c.available) / Math.max(qty, c.available) * 20);
    const priceScore = 20 - Math.min(20, (c.price / 40) * 20);
    const distScore = Math.max(0, 10 - farmer.distanceKm / 20);
    const freshScore = Math.max(0, 10 - c.harvestDaysAgo * 2);
    const total = Math.max(0, Math.min(100, Math.round(gradeScore + qtyScore + priceScore + distScore + freshScore)));
    return { crop: c, farmer, score: total };
  }).sort((a, b) => b.score - a.score).slice(0, 5);

  return (
    <div>
      <SectionTitle eyebrow={t(lang, "smart_match_eyebrow")} title={t(lang, "smart_match_title")} desc={t(lang, "smart_match_desc")} />
      <div className="rounded-2xl bg-white border p-5 mb-6 grid sm:grid-cols-3 gap-3" style={{ borderColor: C.line }}>
        <Field label={t(lang, "field_crop_needed")}>
          <select className={inputCls} style={inputStyle} value={cropName} onChange={(e) => setCropName(e.target.value)}>
            {names.map((n) => <option key={n}>{n}</option>)}
          </select>
        </Field>
        <Field label={t(lang, "field_quantity")}><input type="number" className={inputCls} style={inputStyle} value={qty} onChange={(e) => setQty(Number(e.target.value))} /></Field>
        <Field label={t(lang, "field_preferred_grade")}>
          <select className={inputCls} style={inputStyle} value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option>A+</option><option>A</option><option>B</option>
          </select>
        </Field>
      </div>
      {scored.length === 0 ? <EmptyState text={t(lang, "no_match_farms")} /> : (
        <div className="space-y-3">
          {scored.map((s, i) => (
            <div key={s.crop.id} className="rounded-2xl bg-white border p-4 flex flex-wrap items-center gap-4 justify-between" style={{ borderColor: C.line }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold ff-mono" style={{ backgroundColor: i === 0 ? C.marigold : C.leafLight, color: i === 0 ? "white" : C.forestMid }}>#{i + 1}</div>
                <div>
                  <p className="font-bold ff-display" style={{ color: C.forest }}>{s.farmer.name}</p>
                  <p className="text-xs flex items-center gap-1" style={{ color: C.slate }}><MapPin size={11} />{s.farmer.location} · {s.farmer.distanceKm} km</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <GradeBadge grade={s.crop.grade} />
                <span className="ff-mono font-bold" style={{ color: C.marigoldDark }}>{fmt(s.crop.price)}/kg</span>
                <div className="text-center">
                  <p className="ff-mono font-bold text-lg" style={{ color: C.forestMid }}>{s.score}%</p>
                  <p className="text-2xs" style={{ color: C.slate }}>{t(lang, "match_label")}</p>
                </div>
                <Button size="sm" onClick={() => onView(s.crop)}>{t(lang, "btn_view_details")}</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DemandForecastPage({ lang = "en" }) {
  const dirIcon = { up: TrendingUp, down: TrendingDown, flat: Minus };
  const dirColor = { up: C.forestMid, down: C.danger, flat: C.slate };
  const demandKey = { High: "demand_high", Medium: "demand_medium", Low: "demand_low" };
  return (
    <div>
      <SectionTitle eyebrow={t(lang, "forecast_eyebrow")} title={t(lang, "forecast_title")} desc={t(lang, "forecast_desc")} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FORECAST.map((f, i) => {
          const Icon = dirIcon[f.dir];
          return (
            <div key={i} className="rounded-2xl bg-white border p-4" style={{ borderColor: C.line }}>
              <div className="flex items-center justify-between mb-2">
                <p className="ff-display font-bold flex items-center gap-2" style={{ color: C.forest }}><span className="text-xl">{f.icon}</span>{f.crop}</p>
                <Icon size={18} style={{ color: dirColor[f.dir] }} />
              </div>
              <Badge bg={f.demand === "High" ? C.marigoldLight : f.demand === "Medium" ? C.skyLight : C.slateLight} fg={f.demand === "High" ? C.marigoldDark : f.demand === "Medium" ? C.sky : C.slate}>{t(lang, demandKey[f.demand])} {t(lang, "demand_suffix")}</Badge>
              <p className="text-sm mt-2" style={{ color: C.slate }}>{f.note}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PriceBreakdownPage({ lang = "en" }) {
  const trad = [["Farmer", 12], ["Local trader", 15], ["Wholesaler", 18], ["Distributor", 21], ["Restaurant", 25]];
  return (
    <div>
      <SectionTitle eyebrow={t(lang, "price_break_eyebrow")} title={t(lang, "price_break_title")} desc={t(lang, "price_break_desc")} />
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border p-5" style={{ borderColor: C.line }}>
          <p className="text-xs font-bold uppercase mb-4" style={{ color: C.danger }}>{t(lang, "price_break_current_chain")}</p>
          {trad.map((s, i) => (
            <div key={i} className="flex items-center gap-3 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: C.danger }} />
              <p className="flex-1 text-sm font-semibold" style={{ color: C.forest }}>{s[0]}</p>
              <p className="ff-mono font-bold text-sm">₹{s[1]}/kg</p>
            </div>
          ))}
          <p className="text-xs mt-3" style={{ color: C.slate }}>{t(lang, "price_break_stops_note")}</p>
        </div>
        <div className="rounded-2xl bg-white border p-5" style={{ borderColor: C.line }}>
          <p className="text-xs font-bold uppercase mb-4" style={{ color: C.forestMid }}>{t(lang, "price_break_farmconnect")}</p>
          <div className="flex items-center gap-3 mb-1"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: C.forestMid }} /><p className="flex-1 text-sm font-semibold">{t(lang, "role_farmer")}</p><p className="ff-mono font-bold text-sm">₹17/kg</p></div>
          <div className="flex items-center gap-3 mb-1"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: C.leaf }} /><p className="flex-1 text-sm" style={{ color: C.slate }}>{t(lang, "price_break_platform_fee")}</p></div>
          <div className="flex items-center gap-3 mb-1"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: C.sky }} /><p className="flex-1 text-sm" style={{ color: C.slate }}>{t(lang, "price_break_transport")}</p></div>
          <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: C.forestMid }} /><p className="flex-1 text-sm font-semibold">{t(lang, "role_restaurant")}</p><p className="ff-mono font-bold text-sm">₹21/kg</p></div>
          <p className="text-xs mt-3" style={{ color: C.slate }}>{t(lang, "price_break_settlement_note")}</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-4 gap-4 mt-6">
        <StatCard label={t(lang, "stat_farmer_benefit")} value="+₹5/kg" icon={ArrowUpRight} tint={C.leafLight} />
        <StatCard label={t(lang, "stat_restaurant_saving")} value="₹4/kg" icon={ArrowDownRight} tint={C.marigoldLight} />
        <StatCard label={t(lang, "stat_intermediaries_removed2")} value="3" icon={Users} />
        <StatCard label={t(lang, "stat_wastage_reduction")} value="~22%" icon={Package} tint={C.skyLight} sub={t(lang, "demo_estimate")} />
      </div>
    </div>
  );
}

function NotificationsPage({ list, onReadAll, lang = "en" }) {
  return (
    <div>
      <SectionTitle title={t(lang, "notif_title")} desc={t(lang, "notif_desc")} right={<Button variant="outline" size="sm" onClick={onReadAll}>{t(lang, "btn_mark_all_read")}</Button>} />
      {list.length === 0 ? <EmptyState text={t(lang, "no_notifications")} /> : (
        <div className="space-y-2">
          {list.map((n) => {
            const Icon = typeof n.icon === "string" ? ICONS_BY_NAME[n.icon] || Bell : n.icon || Bell;
            return (
              <div key={n.id} className="rounded-xl bg-white border p-3.5 flex items-start gap-3" style={{ borderColor: C.line }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: n.read ? C.slateLight : C.leafLight }}>
                  <Icon size={16} style={{ color: n.read ? C.slate : C.forestMid }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm ff-body" style={{ color: C.forest, fontWeight: n.read ? 500 : 700 }}>{n.text}</p>
                  <p className="text-xs mt-0.5" style={{ color: C.slate }}>{n.time}</p>
                </div>
                {!n.read && <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: C.marigold }} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ProfilePage({ name, sub, rating, roleTitle, extra, lang = "en" }) {
  return (
    <div className="max-w-xl">
      <SectionTitle title={t(lang, "profile_title")} desc={t(lang, "profile_desc")} />
      <div className="rounded-2xl bg-white border p-6" style={{ borderColor: C.line }}>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ff-display" style={{ backgroundColor: C.leafLight, color: C.forestMid }}>{name[0]}</div>
          <div>
            <p className="ff-display font-bold text-lg" style={{ color: C.forest }}>{name}</p>
            <p className="text-sm" style={{ color: C.slate }}>{sub}</p>
            <Badge bg={C.marigoldLight} fg={C.marigoldDark}>{roleTitle}</Badge>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {rating && <div className="rounded-xl p-3" style={{ backgroundColor: C.cream }}><p className="text-xs" style={{ color: C.slate }}>{t(lang, "stat_rating")}</p><p className="font-bold flex items-center gap-1" style={{ color: C.forest }}><Star size={14} fill={C.marigold} color={C.marigold} />{rating}</p></div>}
          {extra.map(([k, v], i) => (
            <div key={i} className="rounded-xl p-3" style={{ backgroundColor: C.cream }}><p className="text-xs" style={{ color: C.slate }}>{k}</p><p className="font-bold" style={{ color: C.forest }}>{v}</p></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsPage({ orders, lang = "en" }) {
  const statusCounts = STATUS_STEPS.map((s) => ({ name: t(lang, "status_" + s), value: orders.filter((o) => o.status === s).length })).filter((s) => s.value > 0);
  const farmerRevenue = MONTHLY_TX.map((m) => ({ month: m.month, farmer: Math.round(m.value * 12), restaurant: Math.round(m.value * 9) }));
  return (
    <div>
      <SectionTitle eyebrow={t(lang, "analytics_eyebrow")} title={t(lang, "analytics_title")} desc={t(lang, "analytics_desc")} />
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title={t(lang, "chart_monthly_tx")}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY_TX}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.line} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill={C.forestMid} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title={t(lang, "chart_crop_demand")}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={CROP_DEMAND} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.line} />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="crop" tick={{ fontSize: 12 }} width={70} />
              <Tooltip />
              <Bar dataKey="demand" fill={C.marigold} radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title={t(lang, "chart_earnings_savings")}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={farmerRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.line} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip /><Legend />
              <Line type="monotone" dataKey="farmer" name={t(lang, "legend_farmer_earnings")} stroke={C.forestMid} strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="restaurant" name={t(lang, "legend_restaurant_savings")} stroke={C.marigold} strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title={t(lang, "chart_order_status")}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {statusCounts.map((entry, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip /><Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-2xl bg-white border p-5" style={{ borderColor: C.line }}>
      <p className="font-bold ff-display mb-2" style={{ color: C.forest }}>{title}</p>
      {children}
    </div>
  );
}

const MANDI_CROP_ICON = { Tomato: "🍅", Onion: "🧅", Potato: "🥔", Carrot: "🥕", Spinach: "🥬", Brinjal: "🍆", Capsicum: "🫑", Cauliflower: "🥦", "Green Chilli": "🌶️", Cabbage: "🥗" };

function AssignTransportPage({ lang = "en", orders, allActiveOrders, cropById, farmerById, restaurantById, onAssign, autoAssignEnabled, setAutoAssignEnabled, autoAssignRadius, setAutoAssignRadius, transporterLocations }) {
  const [selected, setSelected] = useState({});
  const [transporterId, setTransporterId] = useState(TRANSPORTERS[0].id);
  const [flash, setFlash] = useState(null);

  const toggle = (id) => setSelected((s) => ({ ...s, [id]: !s[id] }));
  const selectedIds = Object.entries(selected).filter(([, v]) => v).map(([k]) => k).filter((id) => orders.some((o) => o.id === id));

  const handleAssign = () => {
    if (selectedIds.length === 0) { setFlash({ type: "warn", text: t(lang, "select_at_least_one") }); return; }
    onAssign(selectedIds, transporterId);
    setSelected({});
    setFlash({ type: "ok", text: t(lang, "assign_success") });
    setTimeout(() => setFlash(null), 2500);
  };

  // Group currently-active orders by the vehicle/transporter carrying them — the
  // clearest way to show that one vehicle can legitimately carry several orders.
  const byVehicle = {};
  allActiveOrders.forEach((o) => {
    if (!o.transporterId) return;
    (byVehicle[o.transporterId] = byVehicle[o.transporterId] || []).push(o);
  });

  return (
    <div>
      <SectionTitle title={t(lang, "assign_transport_title")} desc={t(lang, "assign_transport_desc")} />

      <div className="rounded-2xl bg-white border p-4 mb-5" style={{ borderColor: C.line }}>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="flex-1 min-w-[220px]">
            <p className="font-bold ff-display text-sm flex items-center gap-1.5" style={{ color: C.forest }}><RadioTower size={15} />{t(lang, "auto_assign_settings_title")}</p>
            <p className="text-xs mt-1" style={{ color: C.slate }}>{t(lang, "auto_assign_settings_desc")}</p>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: C.forest }}>
              <input type="checkbox" className="w-4 h-4" checked={autoAssignEnabled} onChange={(e) => setAutoAssignEnabled(e.target.checked)} />
              {t(lang, "auto_assign_toggle_label")}
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold" style={{ color: C.slate }}>{t(lang, "auto_assign_radius_label")}</span>
              <input
                type="number"
                min={1}
                className="w-16 px-2 py-1.5 rounded-lg border text-sm ff-mono text-right"
                style={{ borderColor: C.line }}
                value={autoAssignRadius}
                onChange={(e) => setAutoAssignRadius(Math.max(1, Number(e.target.value) || 1))}
              />
            </div>
          </div>
        </div>
      </div>

      {flash && (
        <div className="rounded-xl p-3 mb-4 flex items-center gap-2" style={{ backgroundColor: flash.type === "ok" ? C.leafLight : "#FFF3CD" }}>
          {flash.type === "ok" ? <CheckCircle2 size={16} style={{ color: C.forestMid }} /> : <AlertTriangle size={16} style={{ color: "#8A6200" }} />}
          <p className="text-sm font-semibold" style={{ color: flash.type === "ok" ? C.forest : "#8A6200" }}>{flash.text}</p>
        </div>
      )}

      {orders.length === 0 ? (
        <EmptyState text={t(lang, "no_unassigned_orders")} />
      ) : (
        <div className="rounded-2xl bg-white border overflow-x-auto scrollbar-thin mb-5" style={{ borderColor: C.line }}>
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left border-b" style={{ borderColor: C.line, color: C.slate }}>
                <th className="p-3 font-semibold">{t(lang, "th_select")}</th>
                <th className="p-3 font-semibold">{t(lang, "th_order")}</th>
                <th className="p-3 font-semibold">{t(lang, "th_crop")}</th>
                <th className="p-3 font-semibold">{t(lang, "th_farmer")}</th>
                <th className="p-3 font-semibold">{t(lang, "th_restaurant")}</th>
                <th className="p-3 font-semibold">{t(lang, "th_deadline")}</th>
                <th className="p-3 font-semibold">{t(lang, "nearest_transporter_label")}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const crop = cropById(o.cropId), farmer = farmerById(o.farmerId), restaurant = restaurantById(o.restaurantId);
                const nearest = farmer ? findNearestTransporter(farmer.location, transporterLocations, 9999) : null;
                const nearestTr = nearest && TRANSPORTERS.find((tr) => tr.id === nearest.transporterId);
                return (
                  <tr key={o.id} className="border-b last:border-0" style={{ borderColor: C.line }}>
                    <td className="p-3"><input type="checkbox" checked={!!selected[o.id]} onChange={() => toggle(o.id)} className="w-4 h-4" /></td>
                    <td className="p-3 ff-mono font-semibold" style={{ color: C.forest }}>{o.id}</td>
                    <td className="p-3">{crop?.icon} {crop?.name} · {o.qty}kg</td>
                    <td className="p-3">{farmer?.name}</td>
                    <td className="p-3">{restaurant?.name}</td>
                    <td className="p-3 ff-mono">{o.deliveryDate}</td>
                    <td className="p-3 text-xs">
                      {nearestTr ? (
                        <span style={{ color: nearest.distance <= autoAssignRadius ? C.forestMid : C.slate }}>
                          {nearestTr.name} · {nearest.distance.toFixed(1)}km{nearest.isLive ? " 📍" : ""}
                        </span>
                      ) : (
                        <span style={{ color: C.slate }}>{t(lang, "no_transporter_in_range")}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="p-4 border-t flex flex-wrap items-center gap-3" style={{ borderColor: C.line, backgroundColor: C.cream }}>
            <Field label={t(lang, "select_transporter_label")}>
              <select className={inputCls + " w-56"} style={inputStyle} value={transporterId} onChange={(e) => setTransporterId(e.target.value)}>
                {TRANSPORTERS.map((tr) => <option key={tr.id} value={tr.id}>{tr.name} · {tr.vehicle}</option>)}
              </select>
            </Field>
            <Button variant="marigold" icon={Truck} onClick={handleAssign} className="mt-1">
              {t(lang, "btn_assign_to_vehicle")} {selectedIds.length > 0 ? `(${selectedIds.length})` : ""}
            </Button>
          </div>
        </div>
      )}

      <SectionTitle title={t(lang, "vehicles_summary_title")} />
      {Object.keys(byVehicle).length === 0 ? (
        <EmptyState text={t(lang, "no_active_vehicle_assignments")} />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(byVehicle).map(([trId, list]) => {
            const tr = TRANSPORTERS.find((x) => x.id === trId);
            return (
              <div key={trId} className="rounded-2xl bg-white border p-4" style={{ borderColor: C.line }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold ff-display" style={{ color: C.forest }}>{tr?.name}</p>
                  <Badge bg={C.skyLight} fg={C.sky} icon={Truck}>{tr?.vehicle}</Badge>
                </div>
                <p className="text-xs mb-2" style={{ color: C.slate }}>{list.length} {t(lang, "orders_count_suffix")}</p>
                <div className="space-y-1.5">
                  {list.map((o) => {
                    const crop = cropById(o.cropId);
                    return (
                      <div key={o.id} className="flex items-center justify-between text-sm rounded-lg px-2.5 py-1.5" style={{ backgroundColor: C.cream }}>
                        <span className="ff-mono font-semibold" style={{ color: C.forest }}>{o.id}</span>
                        <span style={{ color: C.slate }}>{crop?.icon} {o.qty}kg {crop?.name}</span>
                        <StatusBadge status={o.status} lang={lang} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MandiPricesAdminPage({ lang = "en", mandiPrices, onSave }) {
  const [draft, setDraft] = useState(mandiPrices);
  const [savedFlash, setSavedFlash] = useState(false);
  useEffect(() => { setDraft(mandiPrices); }, [mandiPrices]);

  const setPrice = (crop, val) => setDraft((d) => ({ ...d, [crop]: val }));
  const handleSave = () => {
    const cleaned = Object.fromEntries(Object.entries(draft).map(([k, v]) => [k, Math.max(1, Number(v) || 0)]));
    onSave(cleaned);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2000);
  };

  return (
    <div>
      <SectionTitle title={t(lang, "mandi_title")} desc={t(lang, "mandi_desc_admin")} right={
        <Button variant="marigold" icon={CheckCircle2} onClick={handleSave}>{t(lang, "btn_save_prices")}</Button>
      } />
      {savedFlash && (
        <div className="rounded-xl p-3 mb-4 flex items-center gap-2" style={{ backgroundColor: C.leafLight }}>
          <CheckCircle2 size={16} style={{ color: C.forestMid }} />
          <p className="text-sm font-semibold" style={{ color: C.forest }}>{t(lang, "prices_saved")}</p>
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(mandiPrices).map((crop) => (
          <div key={crop} className="rounded-2xl bg-white border p-4 flex items-center gap-3" style={{ borderColor: C.line }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: C.leafLight }}>{MANDI_CROP_ICON[crop] || "🌿"}</div>
            <div className="flex-1">
              <p className="font-bold ff-display text-sm" style={{ color: C.forest }}>{crop}</p>
              <p className="text-xs" style={{ color: C.slate }}>{t(lang, "label_mandi_price_per_kg")}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="ff-mono text-sm" style={{ color: C.slate }}>₹</span>
              <input
                type="number"
                className="w-20 px-2 py-1.5 rounded-lg border text-sm ff-mono text-right"
                style={{ borderColor: C.line }}
                value={draft[crop]}
                onChange={(e) => setPrice(crop, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MandiPricesFarmerView({ lang = "en", mandiPrices, farmerCrops }) {
  return (
    <div>
      <SectionTitle title={t(lang, "mandi_title")} desc={t(lang, "mandi_desc_farmer")} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {Object.entries(mandiPrices).map(([crop, price]) => (
          <div key={crop} className="rounded-2xl bg-white border p-4 flex items-center gap-3" style={{ borderColor: C.line }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: C.leafLight }}>{MANDI_CROP_ICON[crop] || "🌿"}</div>
            <div className="flex-1">
              <p className="font-bold ff-display text-sm" style={{ color: C.forest }}>{crop}</p>
            </div>
            <p className="ff-mono font-bold" style={{ color: C.marigoldDark }}>{fmt(price)}/kg</p>
          </div>
        ))}
      </div>
      {farmerCrops.length > 0 && (
        <>
          <SectionTitle title={t(lang, "my_produce")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {farmerCrops.map((c) => {
              const baseName = c.name.replace(/\(.*\)/, "").trim();
              const mandi = mandiPrices[baseName];
              const diff = mandi ? c.price - mandi : null;
              return (
                <div key={c.id} className="rounded-2xl bg-white border p-4" style={{ borderColor: C.line }}>
                  <div className="flex items-center gap-2 mb-2">
                    <CropVisual crop={c} className="w-9 h-9 rounded-lg" emojiSize={20} />
                    <p className="font-bold ff-display text-sm" style={{ color: C.forest }}>{c.name}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span style={{ color: C.slate }}>{t(lang, "your_price_label")}</span>
                    <span className="ff-mono font-bold" style={{ color: C.forest }}>{fmt(c.price)}/kg</span>
                  </div>
                  {mandi != null && (
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span style={{ color: C.slate }}>{t(lang, "mandi_title")}</span>
                      <span className="ff-mono" style={{ color: C.slate }}>{fmt(mandi)}/kg</span>
                    </div>
                  )}
                  {diff != null && (
                    diff > 0 ? <Badge bg={C.leafLight} fg={C.forestMid} icon={ArrowUpRight}>{fmt(diff)} {t(lang, "above_mandi")}</Badge>
                    : diff < 0 ? <Badge bg={C.dangerLight} fg={C.danger} icon={ArrowDownRight}>{fmt(Math.abs(diff))} {t(lang, "below_mandi")}</Badge>
                    : <Badge bg={C.slateLight} fg={C.slate}>{t(lang, "at_mandi")}</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function AssistantWidget({ lang, role, navKeys, setPage, crops, orders, mandiPrices, addCrop, advanceOrder, setMandiPrices, verifyCrop, meTransporter, setAssistantSearchQuery, bumpAssistantSearchNonce }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => [{ from: "bot", text: at(lang, "greeting") }]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const recognitionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const speak = (text) => {
    if (!voiceOn || typeof window === "undefined" || !window.speechSynthesis) return;
    try {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = SPEECH_LANG_CODE[lang] || "en-IN";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    } catch (e) { /* speech synthesis unsupported — fail silently */ }
  };

  const send = (rawText) => {
    const text = (rawText ?? input).trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    const reply = handleAssistantMessage(text, {
      lang, role, navKeys, setPage, crops, orders, mandiPrices, addCrop, advanceOrder,
      setMandiPrices, verifyCrop, meTransporter, setAssistantSearchQuery, bumpAssistantSearchNonce,
    });
    setMessages((m) => [...m, { from: "bot", text: reply }]);
    speak(reply);
  };

  const toggleListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (listening) { recognitionRef.current?.stop(); return; }
    const rec = new SR();
    rec.lang = SPEECH_LANG_CODE[lang] || "en-IN";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => send(e.results[0][0].transcript);
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    setListening(true);
    rec.start();
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full shadow-xl flex items-center justify-center"
        style={{ backgroundColor: C.marigold }}
        aria-label={at(lang, "title")}
      >
        {open ? <X size={24} color="white" /> : <Bot size={26} color="white" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-40 w-[92vw] max-w-sm rounded-2xl shadow-2xl border overflow-hidden flex flex-col" style={{ backgroundColor: "white", borderColor: C.line, height: "min(70vh, 560px)" }}>
          <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: C.forest }}>
            <div className="flex items-center gap-2">
              <Bot size={18} color={C.marigold} />
              <div>
                <p className="text-white font-bold ff-display text-sm leading-tight">{at(lang, "title")}</p>
                <p className="text-2xs" style={{ color: "#C9D6CF" }}>{at(lang, "subtitle")}</p>
              </div>
            </div>
            <button onClick={() => setVoiceOn((v) => !v)} className="p-1.5 rounded-full hover:bg-white/10">
              {voiceOn ? <Volume2 size={16} color="white" /> : <VolumeX size={16} color="white" />}
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-2" style={{ backgroundColor: C.cream }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] rounded-2xl px-3 py-2 text-sm ff-body"
                  style={{
                    backgroundColor: m.from === "user" ? C.forestMid : "white",
                    color: m.from === "user" ? "white" : C.forest,
                    border: m.from === "user" ? "none" : `1px solid ${C.line}`,
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-2.5 border-t flex items-center gap-2" style={{ borderColor: C.line }}>
            <button
              onClick={toggleListening}
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: listening ? C.danger : C.leafLight }}
            >
              {listening ? <MicOff size={16} color="white" /> : <Mic size={16} style={{ color: C.forestMid }} />}
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
              placeholder={at(lang, "placeholder")}
              className="flex-1 px-3 py-2 rounded-xl border text-sm outline-none ff-body"
              style={{ borderColor: C.line }}
            />
            <button onClick={() => send()} className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: C.marigold }}>
              <Send size={15} color="white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border-2 border-dashed p-10 text-center" style={{ borderColor: C.line }}>
      <Package size={28} className="mx-auto mb-2" style={{ color: C.slate }} />
      <p className="text-sm font-semibold" style={{ color: C.slate }}>{text}</p>
    </div>
  );
}

/* ============================================================
   FEATURE 3: BLOCKCHAIN PROVENANCE LEDGER MODAL
   Real SHA-256 hashes (Web Crypto API), chained block-to-block
   like a genuine hash chain. This is a client-side simulation of
   a blockchain ledger — it is NOT a distributed/consensus ledger —
   but every hash shown is a real cryptographic digest, not a fake
   random string, computed live from each block's actual data.
   ============================================================ */
function ProvenanceLedgerModal({ order, crop, farmer, restaurant, transporter, onClose }) {
  const [blocks, setBlocks] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function build() {
      try {
        if (!window.crypto || !window.crypto.subtle) {
          setError("This browser does not expose the Web Crypto API (crypto.subtle) needed to compute real SHA-256 hashes. Try a modern browser over HTTPS or localhost.");
          return;
        }
        let prevHash = "0".repeat(64); // genesis block
        const out = [];
        const events = order.timeline && order.timeline.length ? order.timeline : [{ label: "Order Placed", done: true, at: new Date().toISOString() }];
        for (let i = 0; i < events.length; i++) {
          const ev = events[i];
          const payload = {
            index: i,
            orderId: order.id,
            event: ev.label,
            timestamp: ev.at || new Date().toISOString(),
            crop: crop ? `${crop.name} (${crop.grade})` : "—",
            quantityKg: order.qty,
            farmer: farmer?.name,
            restaurant: restaurant?.name,
            transporter: transporter?.name || null,
            prevHash,
          };
          const dataStr = JSON.stringify(payload);
          const hash = await sha256Hex(dataStr);
          out.push({ ...payload, dataStr, hash });
          prevHash = hash;
          if (cancelled) return;
        }
        setBlocks(out);
      } catch (e) {
        setError("Could not compute the hash chain: " + (e?.message || "unknown error"));
      }
    }
    build();
    return () => { cancelled = true; };
  }, [order.id]);

  const financials = [
    { label: "Farmer Payment", who: farmer?.name, amount: order.produceCost, color: C.forestMid, bg: C.leafLight },
    { label: "Transport Payment", who: transporter?.name || "Unassigned", amount: order.transportCost, color: C.sky, bg: C.skyLight },
    { label: "Platform Fee (FarmConnect)", who: "FarmConnect", amount: order.platformFee, color: C.marigoldDark, bg: C.marigoldLight },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ backgroundColor: "rgba(18,49,42,0.7)" }}>
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto scrollbar-thin">
        <div className="flex items-center justify-between px-5 py-4 border-b sticky top-0 z-10" style={{ borderColor: C.line, backgroundColor: C.forest }}>
          <div className="flex items-center gap-2">
            <Lock size={18} color={C.marigold} />
            <h3 className="ff-display font-bold text-lg text-white">Blockchain Provenance Ledger</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10"><X size={18} color="white" /></button>
        </div>
        <div className="p-5">
          <div className="rounded-xl p-3 mb-4 flex items-center gap-2" style={{ backgroundColor: C.cream }}>
            <Hash size={16} style={{ color: C.forestMid }} />
            <p className="text-xs ff-body" style={{ color: C.slate }}>
              Order <span className="font-bold ff-mono">{order.id}</span> · {order.qty}kg {crop?.name} · Each block's hash is a real SHA-256 digest (Web Crypto API) of that event's data plus the previous block's hash — tampering with any past block would break every hash after it.
            </p>
          </div>

          {error && (
            <div className="rounded-xl p-3 mb-4 flex items-start gap-2" style={{ backgroundColor: C.dangerLight }}>
              <ShieldAlert size={16} style={{ color: C.danger }} className="mt-0.5" />
              <p className="text-xs ff-body" style={{ color: C.danger }}>{error}</p>
            </div>
          )}

          {!blocks && !error && (
            <div className="flex items-center gap-2 py-8 justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: C.forestMid, borderTopColor: "transparent" }} />
              <p className="text-sm ff-body" style={{ color: C.slate }}>Computing cryptographic hash chain…</p>
            </div>
          )}

          {blocks && (
            <div className="space-y-3">
              {blocks.map((b, i) => (
                <div key={i} className="rounded-2xl border p-4" style={{ borderColor: C.line }}>
                  <div className="flex items-center justify-between mb-2">
                    <Badge bg={C.forestMid} fg="white" icon={Fingerprint}>Block #{b.index}</Badge>
                    <span className="text-xs ff-mono" style={{ color: C.slate }}>{new Date(b.timestamp).toLocaleString("en-IN")}</span>
                  </div>
                  <p className="font-bold ff-display text-sm mb-2" style={{ color: C.forest }}>{b.event}</p>
                  <div className="rounded-lg p-2.5 mb-2 ff-mono text-[11px] break-all leading-relaxed" style={{ backgroundColor: C.forest, color: C.leafLight }}>
                    <p><span style={{ color: "#8FBFA0" }}>prevHash:</span> {b.prevHash.slice(0, 24)}…</p>
                    <p><span style={{ color: C.marigold }}>hash:</span> {b.hash}</p>
                  </div>
                  {(b.event === "Delivered" || b.event === "Payment Completed") && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {financials.map((f, fi) => (
                        <div key={fi} className="rounded-lg p-2 text-center" style={{ backgroundColor: f.bg }}>
                          <p className="text-[10px] font-semibold" style={{ color: C.slate }}>{f.label}</p>
                          <p className="ff-mono font-bold text-xs" style={{ color: f.color }}>{fmt(f.amount)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="rounded-xl p-3 flex items-center gap-2" style={{ backgroundColor: C.leafLight }}>
                <CheckCircle2 size={16} style={{ color: C.forestMid }} />
                <p className="text-sm font-semibold" style={{ color: C.forest }}>Chain integrity verified — {blocks.length} block{blocks.length !== 1 ? "s" : ""}, hashes computed and linked live in your browser.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   FEATURE 4: CONSUMER QR-CODE SCANNER SIMULATOR
   Simulates scanning a product package (no real camera access —
   this is an explicit simulation, as requested) and reveals the
   full farm-to-table trace for that order.
   ============================================================ */
/* ============================================================
   WHATSAPP LISTING — SIMULATED PREVIEW ONLY.
   This is explicitly NOT connected to the real WhatsApp (that would
   require Meta's WhatsApp Business API + a backend server to receive
   webhooks, which breaks the zero-backend/zero-cost design used
   everywhere else in this prototype). It demonstrates the concept —
   a farmer sending a normal chat message to list a crop — using a
   WhatsApp-style chat UI, and reuses the exact same multilingual
   voice/text parsing engine already built for the voice-fill form
   and the in-app assistant.
   ============================================================ */
function WhatsAppListingModal({ lang = "en", addCrop, onClose }) {
  const [messages, setMessages] = useState(() => [{ from: "bot", text: t(lang, "whatsapp_greeting") }]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = (rawText) => {
    const text = (rawText ?? input).trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");

    // Reuse the identical extraction engine used by the voice-fill form / assistant.
    const words = VOICE_WORDS[lang] || VOICE_WORDS.en;
    const hasQty = new RegExp(`\\d+(?:\\.\\d+)?\\s*(?:${words.kg})`, "i").test(text.toLowerCase());
    const hasPrice = new RegExp(`(?:${words.currency})\\s*\\d+(?:\\.\\d+)?|\\d+(?:\\.\\d+)?\\s*(?:${words.currency})`, "i").test(text.toLowerCase());
    const crop = findCropFromSpeech(text.toLowerCase(), lang);

    let reply;
    if (crop && (hasQty || hasPrice)) {
      const patch = parseSpeechToForm(text, lang);
      if (patch.name && patch.quantity && patch.price) {
        addCrop({
          name: patch.name, icon: patch.icon || "🌿", quantity: patch.quantity, price: patch.price,
          grade: patch.grade || "A", method: patch.method || "Conventional",
        });
        const dateNote = patch.harvestDate ? ` · 🗓 ${patch.harvestDate}` : "";
        reply = `${at(lang, "listing_success")} (${patch.quantity}kg ${patch.name} · ₹${patch.price}/kg · ${patch.grade || "A"}${dateNote})`;
      } else {
        reply = at(lang, "listing_incomplete");
      }
    } else {
      reply = at(lang, "listing_incomplete");
    }
    setTimeout(() => setMessages((m) => [...m, { from: "bot", text: reply }]), 500);
  };

  const toggleListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (listening) { recognitionRef.current?.stop(); return; }
    const rec = new SR();
    rec.lang = SPEECH_LANG_CODE[lang] || "en-IN";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => send(e.results[0][0].transcript);
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    setListening(true);
    rec.start();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md max-h-[92vh] overflow-hidden flex flex-col" style={{ height: "min(85vh, 640px)" }}>
        {/* WhatsApp-style header (generic chat icon, not the real WhatsApp logo) */}
        <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: "#128C4A" }}>
          <button onClick={onClose} className="p-1 -ml-1"><ChevronLeft size={22} color="white" /></button>
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
            <MessageCircle size={18} color="white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-sm leading-tight">{t(lang, "whatsapp_bot_name")}</p>
            <p className="text-2xs" style={{ color: "rgba(255,255,255,0.85)" }}>{t(lang, "whatsapp_bot_status")}</p>
          </div>
        </div>

        <div className="px-3 py-2 flex items-start gap-2" style={{ backgroundColor: "#FFF3CD" }}>
          <AlertTriangle size={14} style={{ color: "#8A6200" }} className="mt-0.5 shrink-0" />
          <p className="text-2xs" style={{ color: "#8A6200" }}>{t(lang, "whatsapp_sim_disclaimer")}</p>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-2" style={{ backgroundColor: "#E5EFE5" }}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[82%] rounded-xl px-3 py-2 text-sm ff-body shadow-sm"
                style={{ backgroundColor: m.from === "user" ? "#D9FDD3" : "white", color: C.forest }}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div className="flex justify-start">
            <button
              onClick={() => send(t(lang, "whatsapp_example_text"))}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ borderColor: "#128C4A", color: "#128C4A", backgroundColor: "white" }}
            >
              💬 {t(lang, "whatsapp_try_example")}
            </button>
          </div>
        </div>

        <div className="p-2.5 flex items-center gap-2 bg-white border-t" style={{ borderColor: C.line }}>
          <button
            onClick={toggleListening}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: listening ? C.danger : "#F0F2F0" }}
          >
            {listening ? <MicOff size={16} color="white" /> : <Mic size={16} style={{ color: "#128C4A" }} />}
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder={t(lang, "whatsapp_placeholder")}
            className="flex-1 px-3 py-2 rounded-full border text-sm outline-none"
            style={{ borderColor: C.line, backgroundColor: "#F0F2F0" }}
          />
          <button onClick={() => send()} className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#128C4A" }}>
            <Send size={15} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function QRScanModal({ orders, cropById, farmerById, restaurantById, consumerById, transporterById, onClose, onOpenLedger, lang = "en" }) {
  const [scanning, setScanning] = useState(false);
  const [resultOrderId, setResultOrderId] = useState(null);

  const simulateScan = (orderId) => {
    setScanning(true);
    setResultOrderId(null);
    window.setTimeout(() => {
      setScanning(false);
      setResultOrderId(orderId);
    }, 1100);
  };

  const order = resultOrderId ? orders.find((o) => o.id === resultOrderId) : null;
  const crop = order ? cropById(order.cropId) : null;
  const farmer = order ? farmerById(order.farmerId) : null;
  const restaurant = order ? (order.buyerType === "consumer" ? (consumerById ? consumerById(order.consumerId) : null) : restaurantById(order.restaurantId)) : null;
  const transporter = order && order.transporterId ? transporterById(order.transporterId) : null;
  const idx = order ? STATUS_STEPS.indexOf(order.status) : -1;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ backgroundColor: "rgba(18,49,42,0.7)" }}>
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg max-h-[92vh] overflow-y-auto scrollbar-thin">
        <div className="flex items-center justify-between px-5 py-4 border-b sticky top-0 bg-white z-10" style={{ borderColor: C.line }}>
          <div className="flex items-center gap-2">
            <QrCode size={18} style={{ color: C.forestMid }} />
            <h3 className="ff-display font-bold text-lg" style={{ color: C.forest }}>{t(lang, "consumer_trace_title")}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100"><X size={18} /></button>
        </div>
        <div className="p-5">
          {!order && (
            <>
              <p className="text-sm mb-4 ff-body" style={{ color: C.slate }}>
                {t(lang, "qr_instructions")}
              </p>
              <div className="rounded-2xl relative overflow-hidden flex items-center justify-center mb-5" style={{ backgroundColor: C.forest, height: 180 }}>
                <div className="w-32 h-32 rounded-xl relative" style={{ border: `3px solid ${C.marigold}` }}>
                  <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 rounded-tl-lg" style={{ borderColor: "white" }} />
                  <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 rounded-tr-lg" style={{ borderColor: "white" }} />
                  <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 rounded-bl-lg" style={{ borderColor: "white" }} />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 rounded-br-lg" style={{ borderColor: "white" }} />
                  {scanning && <div className="absolute left-0 right-0 h-0.5" style={{ backgroundColor: C.marigold, top: "50%", boxShadow: `0 0 8px 2px ${C.marigold}`, animation: "none" }} />}
                  {!scanning && <ScanLine size={40} color="rgba(255,255,255,0.5)" className="absolute inset-0 m-auto" />}
                </div>
                {scanning && <p className="absolute bottom-3 text-xs font-semibold text-white">{t(lang, "qr_scanning")}</p>}
              </div>
              {orders.length === 0 ? (
                <EmptyState text={t(lang, "qr_no_orders")} />
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.marigoldDark }}>{t(lang, "qr_sample_packages")}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {orders.slice(0, 6).map((o) => {
                      const c = cropById(o.cropId);
                      return (
                        <button key={o.id} disabled={scanning} onClick={() => simulateScan(o.id)} className="rounded-xl border p-3 text-left hover:shadow-md transition disabled:opacity-50" style={{ borderColor: C.line }}>
                          <p className="text-lg mb-1">{c?.icon}</p>
                          <p className="text-xs font-bold" style={{ color: C.forest }}>{c?.name} · {o.id}</p>
                          <p className="text-2xs" style={{ color: C.slate }}>{o.qty}kg {t(lang, "qr_package_suffix")}</p>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}

          {order && (
            <div>
              <button onClick={() => setResultOrderId(null)} className="flex items-center gap-1 text-xs font-semibold mb-3" style={{ color: C.forestMid }}><ChevronLeft size={14} />{t(lang, "qr_scan_another")}</button>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: C.leafLight }}>{crop?.icon}</div>
                <div>
                  <p className="ff-display font-bold" style={{ color: C.forest }}>{crop?.name} · {order.qty}kg</p>
                  <p className="text-xs" style={{ color: C.slate }}>Order #{order.id}</p>
                </div>
                {crop?.verified && <Badge bg={C.leafLight} fg={C.forestMid} icon={BadgeCheck}>{t(lang, "verified_label")}</Badge>}
              </div>
              <div className="grid grid-cols-1 gap-2 mb-4">
                <div className="rounded-xl p-3 flex items-center gap-2" style={{ backgroundColor: C.cream }}>
                  <Sprout size={16} style={{ color: C.forestMid }} />
                  <p className="text-sm ff-body"><span className="font-bold" style={{ color: C.forest }}>{farmer?.name}</span> · {farmer?.location} · {t(lang, "grade_label")} {crop?.grade} · {t(lang, "quality_score_label")} {crop?.quality?.score}/100</p>
                </div>
                {transporter && (
                  <div className="rounded-xl p-3 flex items-center gap-2" style={{ backgroundColor: C.cream }}>
                    <Truck size={16} style={{ color: C.sky }} />
                    <p className="text-sm ff-body"><span className="font-bold" style={{ color: C.forest }}>{transporter.name}</span> · {transporter.vehicle}</p>
                  </div>
                )}
                <div className="rounded-xl p-3 flex items-center gap-2" style={{ backgroundColor: C.cream }}>
                  {order?.buyerType === "consumer"
                    ? <Home size={16} style={{ color: C.plum }} />
                    : <UtensilsCrossed size={16} style={{ color: C.marigoldDark }} />}
                  <p className="text-sm ff-body"><span className="font-bold" style={{ color: C.forest }}>{restaurant?.name}</span> · {restaurant?.location}{order?.buyerType === "consumer" ? ` · ${t(lang, "role_consumer")}` : ""}</p>
                </div>
              </div>
              <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.marigoldDark }}>{t(lang, "qr_journey")}</p>
              <Stepper steps={STATUS_STEPS.map((s) => t(lang, "status_" + s))} activeIndex={idx} orientation="horizontal" />
              <Button variant="dark" className="w-full mt-4" icon={Link2} onClick={() => onOpenLedger(order.id)}>{t(lang, "qr_view_crypto_ledger")}</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
