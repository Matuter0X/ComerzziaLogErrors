export interface monitorControllerConfigBean {
    entities_count: number;
    topics: {
        main_topic?: string;
        error_topic?: string;
    };

    consumer: {
        enable_auto_commit: boolean;
        auto_offset_reset: string;
        session_timeout_ms: number;
        group_id: string;
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
    folder: string | null;
    priority: number | null;
    processingQueue: string | null;
    inputFolder: string | null;
    processedFolder: string | null;
    failedFolder: string | null;
    synchronous?: boolean;
    asynchronous?: boolean;
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
    consumer_group: string;
    main_topic: string;
    consumer_healthy: boolean;
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
    };
    consumer_status: string;
    consumer_uptime: number;
    error_topic: string;
    success_rate: number;
    status: string;
    timestamp: number;
}

export interface MonitorControllerMetricsBean {
    entities: {
        promotions: {
            process_time_avg: number;
            success: number;
            failure: number;
            received: number;
        };
        rates: {
            process_time_avg: number;
            success: number;
            failure: number;
            received: number;
        };
        salesfiles: {
            process_time_avg: number;
            success: number;
            failure: number;
            received: number;
        };
        warehouse: {
            process_time_avg: number;
            success: number;
            failure: number;
            received: number;
        };
        items: {
            process_time_avg: number;
            success: number;
            failure: number;
            received: number;
        };
        sales: {
            process_time_avg: number;
            success: number;
            failure: number;
            received: number;
        };
        saleschannels: {
            process_time_avg: number;
            success: number;
            failure: number;
            received: number;
        };
    };
    messages: {
        retried: number;
        processed: number;
        sent_to_error_topic: number;
        received: number;
        failed: number;
    };
}


export interface MonitorControllerStatusBean {

    consumerGroupId: string;
    enabledEntities: number;
    applicationType: string;
    health: string;
    mainTopic: string;

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
    };

    errorTopic: string;

    consumer: {
        running: boolean;
        healthy: boolean;
        totalMessages: number;
        consecutiveFailures: number;
        uptime: number;
    };

    timestamp: number;
}

