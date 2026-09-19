import 'dart:io';

class MediaProcessor {
  Future<File> compressImage(File file) async {
    // Utility to resize image to 1280x720 and compress
    // In actual implementation, we'd use flutter_image_compress
    return file; 
  }

  bool isVoiceRecordingValid(Duration duration) {
    // Ensure voice recording is less than 30 seconds
    return duration.inSeconds <= 30;
  }
}
