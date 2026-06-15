-- ==============================================================================
-- MIGRACIÓN DE FLOTA: ESQUEMA DE BASE DE DATOS Y DATOS INICIALES (POSTGRESQL)
-- ==============================================================================
-- Este script crea la estructura de la base de datos para almacenar el estado 
-- operativo de las aeronaves y bloqueos funcionales, tal cual se diseñó en la 
-- matriz de documentación técnica de la academia.

CREATE TABLE IF NOT EXISTS aircraft_models (
    id SERIAL PRIMARY KEY,
    model_name VARCHAR(50) UNIQUE NOT NULL,
    manufacturer VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- TABLA PRINCIPAL DE AERONAVES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS aircraft (
    id SERIAL PRIMARY KEY,
    registration VARCHAR(10) UNIQUE NOT NULL,
    model_id INTEGER REFERENCES aircraft_models(id),
    
    -- Estados operativos globales: 'NO OPERATIVA', 'OP. SOLO P&B', 'CONF. EN REV.', 'LISTA'
    operational_status VARCHAR(30) NOT NULL DEFAULT 'NO OPERATIVA',
    
    -- Control y Trazabilidad de Auditoría
    missing_data TEXT,
    blocked_functions TEXT,
    required_document TEXT,
    required_action TEXT,
    last_revision_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- TABLA DE ESTADO POR MÓDULO (BLOQUEOS Y HABILITACIONES)
-- ==============================================================================
-- Posibles estados por módulo: 'LISTO', 'REQ. REV.', 'BLOQUEADO'
CREATE TABLE IF NOT EXISTS aircraft_module_status (
    id SERIAL PRIMARY KEY,
    aircraft_id INTEGER REFERENCES aircraft(id) ON DELETE CASCADE,
    
    weight_and_balance VARCHAR(15) DEFAULT 'BLOQUEADO',
    fuel VARCHAR(15) DEFAULT 'BLOQUEADO',
    navigation VARCHAR(15) DEFAULT 'BLOQUEADO',
    perf_takeoff VARCHAR(15) DEFAULT 'BLOQUEADO',
    perf_landing VARCHAR(15) DEFAULT 'BLOQUEADO',
    perf_climb VARCHAR(15) DEFAULT 'BLOQUEADO',
    perf_cruise VARCHAR(15) DEFAULT 'BLOQUEADO',
    checklist VARCHAR(15) DEFAULT 'BLOQUEADO',
    limitations VARCHAR(15) DEFAULT 'BLOQUEADO',
    
    CONSTRAINT unique_aircraft_modules UNIQUE (aircraft_id)
);

-- ==============================================================================
-- INSERCIÓN DE DATOS INICIALES SEGÚN MATRIZ ACTUAL
-- ==============================================================================

-- 1. Insertar Modelos
INSERT INTO aircraft_models (model_name) VALUES 
('P2006T'), 
('P2002 MKII'), 
('P2002 iS'), 
('P92 LSA'), 
('Cessna 152'), 
('Cessna 172')
ON CONFLICT (model_name) DO NOTHING;

-- 2. Insertar Aeronaves
INSERT INTO aircraft (registration, model_id, operational_status, missing_data, blocked_functions, required_document, required_action) VALUES 
('CC-DKD', (SELECT id FROM aircraft_models WHERE model_name = 'P2006T'), 'NO OPERATIVA', 'Brazo/momento vacío, pesaje individual.', 'Peso y Balance, Combustible, Perf.', 'Reporte pesaje individual firmado (CMA 287).', 'Conseguir y cargar el reporte de pesaje individual.'),
('CC-DDF', (SELECT id FROM aircraft_models WHERE model_name = 'P2002 MKII'), 'OP. SOLO P&B', 'Tablas de performance y consumo.', 'Combustible de ruta, Perf.', 'Tablas de performance del POH.', 'Verificar visualmente pesaje de 2019 y subir perf.'),
('CC-DDG', (SELECT id FROM aircraft_models WHERE model_name = 'P2002 MKII'), 'CONF. EN REV.', 'Resolución de discrepancia de peso (2 lbs).', 'Peso y Balance, Combustible, Perf.', 'Enmienda o aclaración de pesaje reciente (2022-2025).', 'Confirmar cuál es el peso vacío oficial vigente.'),
('CC-DDH', (SELECT id FROM aircraft_models WHERE model_name = 'P2002 MKII'), 'OP. SOLO P&B', 'Tablas de performance y consumo.', 'Combustible de ruta, Perf.', 'Tablas de performance del POH.', 'Verificar visualmente pesaje de 2022 y subir perf.'),
('CC-DMJ', (SELECT id FROM aircraft_models WHERE model_name = 'P2002 iS'), 'CONF. EN REV.', 'Resolución de discrepancia de peso (2 lbs).', 'Peso y Balance, Combustible, Perf.', 'Aclaración sobre peso con/sin unusable fuel.', 'Confirmar si peso vacío incluye combustible no usable.'),
('CC-DMK', (SELECT id FROM aircraft_models WHERE model_name = 'P92 LSA'), 'CONF. EN REV.', 'Envolvente de CG verificado del P92.', 'Peso y Balance, Combustible, Perf.', 'POH Sección 6 (Envolvente CG del P92).', 'Entregar envolvente de CG correcto del P92.'),
('CC-CIM', (SELECT id FROM aircraft_models WHERE model_name = 'Cessna 152'), 'OP. SOLO P&B', 'Tablas de performance y consumo.', 'Combustible de ruta, Perf.', 'Tablas de performance del POH.', 'Cargar tablas de performance y consumo del POH.'),
('CC-TCA', (SELECT id FROM aircraft_models WHERE model_name = 'Cessna 152'), 'CONF. EN REV.', 'Confirmación de STC Hélice en cartilla física.', 'Peso y Balance, Combustible, Perf.', 'Confirmación de hélice Sensenich (2022).', 'Aprobar uso de datos de enmienda de 2022.'),
('CC-KIJ', (SELECT id FROM aircraft_models WHERE model_name = 'Cessna 152'), 'CONF. EN REV.', 'Reporte de pesaje individual de CC-KIJ.', 'Peso y Balance, Combustible, Perf.', 'Reporte de pesaje firmado de CC-KIJ.', 'Cargar el certificado de pesaje individual.'),
('CC-AFB', (SELECT id FROM aircraft_models WHERE model_name = 'Cessna 172'), 'OP. SOLO P&B', 'Tablas de performance y consumo.', 'Combustible de ruta, Perf.', 'Tablas de performance del POH.', 'Cargar tablas de performance y consumo del C172SP.'),
('CC-AFC', (SELECT id FROM aircraft_models WHERE model_name = 'Cessna 172'), 'OP. SOLO P&B', 'Tablas de performance y consumo.', 'Combustible de ruta, Perf.', 'Tablas de performance del POH.', 'Cargar tablas de performance y consumo del C172SP.'),
('CC-AFD', (SELECT id FROM aircraft_models WHERE model_name = 'Cessna 172'), 'OP. SOLO P&B', 'Tablas de performance y consumo.', 'Combustible de ruta, Perf.', 'Tablas de performance del POH.', 'Cargar tablas de performance y consumo del C172SP.')
ON CONFLICT (registration) DO NOTHING;

-- 3. Insertar Estado de los Módulos por Matrícula
INSERT INTO aircraft_module_status (aircraft_id, weight_and_balance, fuel, navigation, perf_takeoff, perf_landing, perf_climb, perf_cruise, checklist, limitations) VALUES 
((SELECT id FROM aircraft WHERE registration = 'CC-DKD'), 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'REQ. REV.', 'LISTO'),
((SELECT id FROM aircraft WHERE registration = 'CC-DDF'), 'REQ. REV.', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'LISTO', 'LISTO'),
((SELECT id FROM aircraft WHERE registration = 'CC-DDG'), 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'LISTO', 'LISTO'),
((SELECT id FROM aircraft WHERE registration = 'CC-DDH'), 'REQ. REV.', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'LISTO', 'LISTO'),
((SELECT id FROM aircraft WHERE registration = 'CC-DMJ'), 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'LISTO', 'LISTO'),
((SELECT id FROM aircraft WHERE registration = 'CC-DMK'), 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'LISTO', 'LISTO'),
((SELECT id FROM aircraft WHERE registration = 'CC-CIM'), 'LISTO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'LISTO', 'LISTO'),
((SELECT id FROM aircraft WHERE registration = 'CC-TCA'), 'REQ. REV.', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'LISTO', 'LISTO'),
((SELECT id FROM aircraft WHERE registration = 'CC-KIJ'), 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'LISTO', 'LISTO'),
((SELECT id FROM aircraft WHERE registration = 'CC-AFB'), 'LISTO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'LISTO', 'LISTO'),
((SELECT id FROM aircraft WHERE registration = 'CC-AFC'), 'LISTO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'LISTO', 'LISTO'),
((SELECT id FROM aircraft WHERE registration = 'CC-AFD'), 'LISTO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'BLOQUEADO', 'LISTO', 'LISTO');
