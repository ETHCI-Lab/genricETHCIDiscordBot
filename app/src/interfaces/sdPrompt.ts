export interface sdPrompt {
    prompt: string;
    negative_prompt?: string;
    styles?: string[];
    seed?: number;
    subseed?: number;
    subseed_strength?: number;
    seed_resize_from_h?: number;
    seed_resize_from_w?: number;
    sampler_name?: string;
    scheduler?: string;
    batch_size?: number;
    n_iter?: number;
    steps?: number;
    cfg_scale?: number;
    width?: number;
    height?: number;
    restore_faces?: boolean;
    tiling?: boolean;
    do_not_save_samples?: boolean;
    do_not_save_grid?: boolean;
    eta?: number;
    denoising_strength?: number;
    s_min_uncond?: number;
    s_churn?: number;
    s_tmax?: number;
    s_tmin?: number;
    s_noise?: number;
    override_settings?: {}; // 若您能夠提供具體的鍵和值類型，可以替換該類型
    override_settings_restore_afterwards?: boolean;
    refiner_checkpoint?: string;
    refiner_switch_at?: number;
    disable_extra_networks?: boolean;
    firstpass_image?: string;
    comments?: {}; 
    enable_hr?: boolean;
    firstphase_width?: number;
    firstphase_height?: number;
    hr_scale?: number;
    hr_upscaler?: string;
    hr_second_pass_steps?: number;
    hr_resize_x?: number;
    hr_resize_y?: number;
    hr_checkpoint_name?: string;
    hr_sampler_name?: string;
    hr_scheduler?: string;
    hr_prompt?: string;
    hr_negative_prompt?: string;
    force_task_id?: string;
    sampler_index?: string; 
    script_name?: string;
    script_args?: any[]; 
    send_images?: boolean;
    save_images?: boolean;
    alwayson_scripts?: {}; 
    infotext?: string;
}