# RevenueCat Integration Setup

## Phase 1: Install Dependencies

### Step 1: Install npm Packages

Run these commands in your project root:
```bash
npm install @revenuecat/purchases-capacitor@latest
npm install @revenuecat/purchases-typescript-internal-utils@latest
```

**Expected Result:**
- `package.json` updated with new dependencies
- `package-lock.json` regenerated
- `node_modules` contains RevenueCat packages

### Step 2: Sync Capacitor

After npm installation, sync with native iOS project:
```bash
npx cap sync ios
```

**Expected Result:**
- Capacitor copies web assets to iOS
- Native dependencies registered

### Step 3: Install iOS CocoaPods

Navigate to iOS folder and install pods:
```bash
cd ios/App
pod install
cd ../..
```

**Expected Result:**
- RevenueCat iOS SDK installed via CocoaPods
- `Podfile.lock` updated

---

## Phase 2: Native iOS Configuration (Next Steps)

After dependencies are installed, the following native configurations are required:

### Required Files to Create/Modify:
1. **RevenueCat API Key Configuration**
   - Obtain API key from RevenueCat dashboard
   - Configure in iOS app initialization

2. **Info.plist Updates**
   - Add required permissions
   - Configure StoreKit 2 if needed

3. **App Initialization**
   - Initialize RevenueCat SDK on app launch
   - Configure with your API key

### Documentation References:
- RevenueCat Capacitor SDK: https://docs.revenuecat.com/docs/capacitor
- iOS Setup Guide: https://docs.revenuecat.com/docs/ios

---

## Verification Checklist

After completing all steps:
- [ ] npm packages installed successfully
- [ ] Capacitor sync completed without errors
- [ ] CocoaPods installed without errors
- [ ] Xcode project opens without build errors
- [ ] RevenueCat SDK imported successfully in code
- [ ] API key configured (Phase 2)
- [ ] Test purchase flow works (Phase 2)

---

## Troubleshooting

### Issue: npm install fails
**Solution:** Check npm version compatibility, clear cache with `npm cache clean --force`

### Issue: pod install fails
**Solution:** Update CocoaPods with `sudo gem install cocoapods`, then retry

### Issue: Capacitor sync fails
**Solution:** Ensure iOS platform added with `npx cap add ios` first

### Issue: Xcode build errors
**Solution:** Clean build folder (Cmd+Shift+K), rebuild

---

## Next Steps After Installation

Once dependencies are installed and verified:
1. Create RevenueCat configuration file
2. Initialize SDK in app startup
3. Implement purchase flow logic
4. Add product offerings configuration
5. Test in sandbox environment
