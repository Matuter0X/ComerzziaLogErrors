export interface monitorControllerConfigBean {
    entities_count: number;
    entities: {
        tickets:{
            dlq_topic: string;
            scheduler_enabled: boolean;
            main_topic: string;
            scheduler_cron: string;
        },
        cashjournal:{
            dlq_topic: string;
            scheduler_enabled: boolean;
            main_topic: string;
            scheduler_cron: string;
        }
    },
    consumer: {
        enable_auto_commit: boolean;
        auto_offset_reset: string;
        session_timeout_ms: number;
        base_group_id: string;
        max_poll_records: number;
        concurrency: number;
    };

    retry: {
        delayMs: number;
        maxRetries: number;
        enabled: boolean;
    };

}

export interface monitorControllerEntitiesBean {
    type?: string;
    name?: string;
    serviceBean?: string;
    mapperBean: string;
    mapperMethod: string;
    erpEndpoint: string;
    topic: string;
    dlqTopic: string;
    schedulerEnabled: boolean;
    schedulerCron: string;
}

export interface MonitorControllerEntityTypeBean {
    serviceBean?: string;
    name?: string;
    metrics?: {
        avgProcessingTime?: number;
        success?: number;
        failure?: number;
        received?: number;
    }
    type?: string;
}

export interface MonitorControllerHealthBean {
    consumer_healthy: string;
    entities_configured: number;
    health: string;
    total_messages: number;
    consecutive_errors: number;
    stats: {
        retry_scheduled: number;
        messages_sent_to_error_topic: number;
        messages_processed: number;
        messages_failed: number;
        messages_retried: number;
        retry_failure: number;
        retry_success: number;
        messages_received: number;
    },
    consumer_status: string;
    consumer_uptime: number;
    base_consumer_group: string;
    topics_per_entity:{
        tickets: number,
        cashjournal: number
    },
    success_rate: number;
    status: string;
    timestamp: number;
}

export interface MonitorControllerMetricsBean {
    entities: {
        tickets: {
            sent_to_error_topic: number;
            process_time_avg: number;
            success: number;
            failure: number;
            received: number;
        };
        cashjournal: {
            sent_to_error_topic: number;
            process_time_avg: number;
            success: number;
            failure: number;
            received: number;
        }
    },
    messages: {
        retried: number;
        processed: number;
        sent_to_error_topic: number;
        received: number;
        failed: number;
    };
}


export interface MonitorControllerStatusBean {
    baseConsumerGroupId: string;
    enabledEntities: number;
    applicationType: string;
    entities: {
        tickets: {
            groupId: string;
            dlqTopic: string;
            mainTopic: string;
        },
        cashjournal: {
            groupId: string;
            dlqTopic: string;
            mainTopic: string;
        }
    },
    health: string;
    metrics: {
        retry_scheduled: number;
        messages_sent_to_error_topic: number;
        messages_processed: number;
        messages_failed: number;
        messages_retried: number;
        retry_failure: number;
        retry_success: number;
        success_rate: number;
        messages_received: number;
    },
    consumer: {
        running: boolean;
        healthy: boolean;
        totalMessages: number;
        consecutiveFailures: number;
        uptime: number;
    };
    timestamp: number;
}

