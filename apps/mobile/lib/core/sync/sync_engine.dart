import 'dart:async';
import '../network/connection_evaluator.dart';

class SyncEngine {
  Timer? _timer;
  final ConnectionEvaluator _evaluator;

  SyncEngine(this._evaluator);

  void start() {
    _timer = Timer.periodic(const Duration(minutes: 5), (timer) {
      _processQueue();
    });
  }

  Future<void> _processQueue() async {
    final quality = await _evaluator.evaluate();
    if (quality == ConnectionQuality.offline) return;

    // 1. Fetch pending from OutboxDao ordered by priority (Text > Voice > Image)
    // 2. For each pending item, attempt API synchronization
    // 3. Mark success ('SYNCED')
    // 4. On failure, increment retryCount, apply exponential backoff (2^retryCount * 1 min)
  }

  void stop() {
    _timer?.cancel();
  }
}
