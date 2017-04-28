cd \Users\Jonathan\Downloads
del /S /Q GZFlash.apk
mv GZFlash-debug.apk GZFlash.apk
"C:\Program Files (x86)\Android\android-sdk\platform-tools\adb.exe" install -r GZFlash.apk
cd \Projetos\PhoneGap\GZFlash